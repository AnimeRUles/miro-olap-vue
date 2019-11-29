<template>
    <el-row :gutter="8">

        <el-col>
            <el-button @click="refreshStyle"
                       icon="el-icon-refresh"
                       style="margin: 0; padding: 0; margin-right: 1em"
                       type="text"></el-button>

            <el-select v-model="style.wId"
                       clearable
                       placeholder="select style">

                <el-option
                        v-for="w in style.w_"
                        :key="w.id"
                        :label="getWidgetLabel(w)"
                        :value="w.id">
                </el-option>
            </el-select>
        </el-col>

        <el-col>
            <el-button @click="addWidgetStart"
                       icon="el-icon-circle-plus-outline"
                       style="margin: 0; padding: 0; margin-right: 1em"
                       type="text"></el-button>

            <el-button @click="refreshTag"
                       icon="el-icon-refresh"
                       style="margin: 0; padding: 0; margin-right: 1em"
                       type="text"></el-button>

            <el-select v-model="widget.start.wId"
                       clearable
                       placeholder="select widget start">

                <el-option
                        v-for="w in widget.start.w_"
                        :key="w.id"
                        :label="getWidgetLabel(w)"
                        :value="w.id">
                </el-option>
            </el-select>
        </el-col>

        <el-col style="text-align: right;">
            <el-checkbox v-model="isAddTag"
                         label="Add tag"
                         border
                         style="margin-right: 1em"/>

            <el-button @click="addLine">Create line</el-button>
        </el-col>

        <el-col style="text-align: right;">
            <el-button @click="applyWidgetStyle">Apply style</el-button>
        </el-col>

    </el-row>
</template>

<script>
    import constant from '@/constant'

    export default {
        name      : 'CreateLine',
        components: {},

        data(){
            return {
                style: {
                    w_: {},
                    w : null,

                    wId: null,
                },

                widget: {
                    start: {
                        w_: [],
                        w : null,

                        wId: null,
                    }
                },

                isAddTag: true,
            }
        },

        watch: {
            'style.wId'       : function( newVal, oldVal ){
                this.style.w = this.style.w_[ newVal ]
            },
            'widget.start.wId': function( newVal, oldVal ){
                this.widget.start.w = this.widget.start.w_[ newVal ]
            },
        },

        mounted(){
            miro.onReady( () => {
                this.refreshStyle()
                this.refreshTag()
            } )
        },

        methods: {
            getWidgetLabel( w ){
                let title = w.plainText || w.type + '-' + w.id
                if( w.type === constant.widget.type.LINE && w.captions.length ){
                    title = w.captions[ 0 ].text
                }

                return title
            },

            //region style
            async refreshStyle(){
                this.style.wId = null
                this.style.w_  = await this.getWidgetById_Object_(
                    await this.getWidgetStyleId_() )
            },

            async applyWidgetStyle(){
                if( ! this.style.w ){
                    miro.showErrorNotification( 'Choose style' )
                    return
                }

                let w_ = await this.getWidgetSelect_()
                if( ! w_.length ){
                    miro.showErrorNotification( 'Choose widget' )
                    return
                }

                let isErrorType = false
                for( const w of w_ ){
                    if( w.type !== this.style.w.type ){
                        isErrorType = true
                        continue
                    }
                    await miro.board.widgets.update( {
                        id   : w.id,
                        style: this.style.w.style,
                    } )
                }

                if( isErrorType ){
                    miro.showErrorNotification(
                        'Widgets with a different type are not updated' )
                }
            },
            //endregion

            //region tag
            async addWidgetStart(){
                let wSelect = await this.getWidgetSelectFirst()

                this.$set( this.widget.start.w_, wSelect.id, wSelect )
            },

            async refreshTag(){
                this.widget.start.wId = null
                this.widget.start.w_  = await this.getWidgetById_Object_(
                    await this.getWidgetTagId_() )
            },

            async addLine(){
                if( ! this.widget.start.w ){
                    miro.showErrorNotification( 'Choose a start widget' )
                    return
                }

                let wSelect = await this.getWidgetSelectFirst()
                if( ! wSelect ){
                    miro.showErrorNotification( 'Choose a end widget' )
                    return
                }

                let style = null
                if( this.style.w ){
                    if( this.style.w.type !== constant.widget.type.LINE ){
                        miro.showErrorNotification(
                            'Select the widget line style or clear the style' )
                        return
                    }
                    style = this.style.w.style
                }

                let w = await miro.board.widgets.create( {
                    type         : constant.widget.type.LINE,
                    startWidgetId: this.widget.start.w.id,
                    endWidgetId  : wSelect.id,
                    style
                } )

                let html       = document.createElement( 'html' )
                html.innerHTML = '<html><head><title>temp</title></head><body>'
                    + wSelect.text
                    + '</body></html>'

                //todo check for duplicates
                // let p_ = html.getElementsByTagName('p');

                let wStart = await this.getWidgetById( this.widget.start.w.id )
                if( this.isAddTag ){
                    wSelect.text += this.createTagHtmlElement( wStart ).outerHTML
                }

                await miro.board.widgets.update( wSelect )

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
            //endregion
        }
    }
</script>

<style>
</style>
