<template>
    <el-row :gutter="8">
        <el-col v-if="wSelect">
            <div @click="blinkWidget(wSelect)">
                widget id: {{ wSelect.id }}
            </div>

            <div>
                <div v-for="wChild in wChild_"
                     :key="wChild.id"
                     @click="blinkWidget(wChild)">

                    <el-divider></el-divider>
                    <div v-html="wChild.text"></div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import { each } from 'lodash'
    import constant from '@/constant'

    export default {
        name      : 'Widget',
        components: {},

        data(){
            return {
                wSelect: null,
                wChild_: []
            }
        },

        mounted(){
            miro.onReady( async() => {
                miro.addListener( 'SELECTION_UPDATED', this.showWidgetData )
            } )
        },

        destroyed(){
            miro.removeListener( 'SELECTION_UPDATED', this.showWidgetData )
        },

        methods: {
            async showWidgetData( e ){
                if( e.data.length !== 1 ){
                    this.wSelect = null
                    return
                }

                this.wSelect = await this.getWidgetById( e.data[ 0 ].id )
                this.wChild_ = []

                let wLine_ = [].concat(
                    await miro.board.widgets.get( {
                        type         : constant.widget.type.LINE,
                        startWidgetId: this.wSelect.id,
                    } )
                ).concat(
                    await miro.board.widgets.get( {
                        type       : constant.widget.type.LINE,
                        endWidgetId: this.wSelect.id,
                    } )
                )

                each( wLine_, async wLine => {
                    let wChildId = (
                        wLine.startWidgetId === this.wSelect.id
                            ? wLine.endWidgetId
                            : wLine.startWidgetId
                    )
                    let wChild   = await this.getWidgetById( wChildId )
                    this.wChild_.push( wChild )
                } )
            },

            async blinkWidget( w ){
                let w_ = [].concat( await miro.board.widgets.get( {
                    type         : constant.widget.type.LINE,
                    startWidgetId: this.wSelect.id,
                    endWidgetId  : w.id,
                } ) ).concat( await miro.board.widgets.get( {
                    type         : constant.widget.type.LINE,
                    startWidgetId: w.id,
                    endWidgetId  : this.wSelect.id,
                } ) ).concat( w )

                miro.board.widgets.__blinkWidget( w_ )
                await this.sleep( 500 )
                miro.board.widgets.__blinkWidget( w_ )
            },
        }
    }
</script>

<style>
</style>
