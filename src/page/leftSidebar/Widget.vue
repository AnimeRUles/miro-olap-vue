<template>
    <el-row :gutter="8">
        <el-col v-if="wSelect">
            <div @click="highlightWidget(wSelect)">
                <el-divider content-position="right">
                    {{ wSelect.id }}
                    <i class="el-icon-star-off"></i>
                </el-divider>
                <div v-html="wSelect.text"></div>
            </div>

            <div v-for="wChild in wChild_"
                 :key="wChild.w.id"
                 @click="highlightWidget(wChild.w)">

                <el-divider content-position="right">
                    {{ wChild.w.id }}
                    <i :class="getLineDirectionIcon(wChild.lineDirection)"></i>
                    <i class="el-icon-star-off"></i>
                </el-divider>
                <div v-html="wChild.w.text"></div>
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
                    let lineDirection = ( wLine.startWidgetId === this.wSelect.id
                        ? constant.lineDirection.OUT
                        : constant.lineDirection.IN )
                    let wChildId      = ( lineDirection === constant.lineDirection.OUT
                            ? wLine.endWidgetId
                            : wLine.startWidgetId
                    )
                    let wChild        = await this.getWidgetById( wChildId )
                    this.wChild_.push( {
                        w: wChild,
                        lineDirection,
                    } )
                } )
            },

            getLineDirectionIcon(lineDirection){
                return (lineDirection === constant.lineDirection.OUT
                    ? 'el-icon-back'
                    : 'el-icon-right')
            },

            async highlightWidget( w ){
                await this.goToWidget( w )
                await this.blinkWidget( w )
            },

            async goToWidget( w ){
                let viewport = await miro.board.viewport.getViewport()

                await miro.board.viewport.setViewportWithAnimation( {
                    x     : w.bounds.left - ( viewport.width / 2 ),
                    y     : w.bounds.top - ( viewport.height / 2 ),
                    width : viewport.width,
                    height: viewport.height,
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
            },
        }
    }
</script>

<style>
</style>
