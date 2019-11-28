<template>
    <el-row :gutter="8">

        <el-col>
            <el-button @click="refreshStyle"
                       icon="el-icon-refresh"
                       style="margin-right: 1em"></el-button>

            <el-select v-model="style.combobox.value"
                       clearable
                       placeholder="select style">

                <el-option
                        v-for="v in style.combobox.value_"
                        :key="v.value"
                        :label="v.label"
                        :value="v.value">
                </el-option>
            </el-select>
        </el-col>

        <el-col>
            <el-dropdown split-button
                         :type="(wStartSelect ? 'info' : '')"
                         @click="selectWidgetStart_begin"
            >{{(wStartSelect ? wStartSelect.name : 'Choose a start widget')}}
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="tag in wStart_"
                                      :key="tag.id"
                                      @click.native="wStartSelect = getWidgetStartById(tag.id)"
                    >{{tag.name}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <el-col style="text-align: right;">
            <el-button @click="selectWidgetEnd_begin">Create line</el-button>
        </el-col>

        <el-col style="text-align: right;">
            <el-checkbox v-model="isAddTag" label="Add tag" border/>
        </el-col>

    </el-row>
</template>

<script>
    import { each } from 'lodash'
    import constant from '@/constant'

    export default {
        name      : 'CreateLine',
        components: {},

        data(){
            return {
                style: {
                    w_: {},
                    w : null,

                    combobox: {
                        value_: [],
                        value : '',
                    }
                },

                wStart_     : [],
                wStartSelect: null,

                isAddTag: true,
            }
        },

        watch: {
            'style.w_': {
                deep   : true,
                handler: async function( newVal, oldVal ){
                    //bug newVal properties does not exist at the moment
                    await this.sleep( 1000 )

                    let _ = []
                    each( newVal, w => {
                        let title = w.text || w.type + '-' + w.id
                        if( w.type === constant.widget.type.LINE && w.captions.length ){
                            title = w.captions[ 0 ].text
                        }

                        _.push( {
                            value: w.id,
                            label: title,
                        } )
                    } )
                    this.style.combobox.value_ = _
                },
            },

            'style.combobox.value': function( newVal, oldVal ){
                this.style.w = this.style.w_[ newVal ]
            },
        },

        mounted(){
            miro.onReady( async() => {
                this.refreshStyle()
                this.wStart_  = await this.getTagObj_()
            } )
        },

        methods: {
            async refreshStyle(){
                console.log('refreshStyle')
                this.style.combobox.value = null
                this.style.w_ = await this.getStyleObj_()
            },

            async selectWidgetStart_begin(){
                let wSelect = await this.getWidgetSelectFirst()
                if( wSelect ){
                    this.selectWidgetStart( wSelect.id )
                    return
                }
            },

            async selectWidgetStart( wId ){
                let w      = await this.getWidgetById( wId ),
                    wStart = this.getWidgetStartById( w.id )
                if( ! wStart ){
                    wStart = this.getWidgetObjCustom( w )
                    this.wStart_.push( wStart )
                }
                this.wStartSelect = wStart
            },

            async selectWidgetEnd_begin(){
                if( ! this.wStartSelect ){
                    miro.showErrorNotification( 'Choose a start widget' )
                    return
                }

                let wSelect = await this.getWidgetSelectFirst()
                if( ! wSelect ){
                    miro.showErrorNotification( 'Choose a end widget' )
                    return
                }

                if( wSelect ){
                    this.selectWidgetEnd( wSelect )
                    return
                }
            },

            async selectWidgetEnd( wEnd ){
                let style = ( this.style.w
                    ? this.style.w.style
                    : {
                        lineEndStyle: 5,
                        lineType    : 2,
                        lineColor   : '#808080',
                    } )
                let w     = await miro.board.widgets.create( {
                    type         : constant.widget.type.LINE,
                    startWidgetId: this.wStartSelect.id,
                    endWidgetId  : wEnd.id,
                    style
                } )

                let html       = document.createElement( 'html' )
                html.innerHTML = '<html><head><title>temp</title></head><body>'
                    + wEnd.text
                    + '</body></html>'

                //todo check for duplicates
                // let p_ = html.getElementsByTagName('p');

                let wStart = await this.getWidgetById( this.wStartSelect.id )
                if( this.isAddTag ){
                    wEnd.text += this.createTagHtmlElement( wStart ).outerHTML
                }

                await miro.board.widgets.update( wEnd )

                await miro.board.widgets.sendBackward( w )
                // await miro.board.selection.selectWidgets(w)
            },

            createTagHtmlElement( wTag ){
                let p = document.createElement( 'p' )

                let span                   = document.createElement( 'span' )
                span.style.backgroundColor = wTag.style.borderColor
                span.textContent           = ' #' + wTag.plainText + ' '

                p.appendChild( span )

                return p
            },

            getWidgetObjCustom( w ){
                if( ! w ) return null

                return {
                    id  : w.id,
                    name: w.plainText,
                }
            },

            getWidgetStartById( id ){
                return this.wStart_.find( ( el ) => el.id === id ) || null
            },

            async getTagObj_(){
                let _ = []

                each( await this.getWidgetIdByFrame_( '#' ), async wId => {
                    _.push( this.getWidgetObjCustom(
                        await this.getWidgetById( wId )
                    ) )
                } )

                return _
            },

            async getStyleObj_(){
                let _ = {}

                each( await this.getWidgetIdByFrame_( '*' ), async wId => {
                    let w     = await this.getWidgetById( wId )
                    _[ w.id ] = w
                } )

                return _
            },
        }
    }
</script>

<style>
</style>
