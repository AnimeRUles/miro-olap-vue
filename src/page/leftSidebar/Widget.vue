<template>
    <el-row :gutter="8" class="collapse-widget">
        <el-col v-if="wSelect">
            <div class="widget"
                 @click="highlightWidget(wSelect)">

                <el-divider content-position="center">
                    <i class="el-icon-star-off copy"
                       @click="logWidget(wSelect.id)"></i>
                </el-divider>
                <div v-html="wSelect.text"></div>
            </div>

            <div v-for="wChild in wChild_"
                 :key="wChild.w.id"

                 class="widget"
                 @click="highlightWidget(wChild.w)">

                <el-divider content-position="center">
                    <i class="el-icon-star-off"></i>
                    <i :class="getLineDirectionIcon(wChild.lineDirection)"
                       class="copy"
                       @click="logWidget(wChild.wLine.id)"></i>
                    <i class="el-icon-full-screen copy"
                       @click="logWidget(wChild.w.id)"></i>
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
                    let lineDirection = (
                        wLine.startWidgetId === this.wSelect.id
                            ? constant.lineDirection.OUT
                            : constant.lineDirection.IN )
                    let wChildId      = (
                        lineDirection === constant.lineDirection.OUT
                            ? wLine.endWidgetId
                            : wLine.startWidgetId
                    )

                    const wTagId_ = await this.getWidgetTagId_()
                    if( ! wTagId_.includes( wChildId ) ){
                        let wChild = await this.getWidgetById( wChildId )
                        this.wChild_.push( {
                            w: wChild,
                            wLine,
                            lineDirection,
                        } )
                    }
                } )
            },

            getLineDirectionIcon( lineDirection ){
                return ( lineDirection === constant.lineDirection.OUT
                    ? 'el-icon-right'
                    : 'el-icon-back' )
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

            async logWidget( wId ){
                console.log( await this.getWidgetById( wId ) )
            }
        }
    }
</script>

<style lang="scss">
    .collapse-widget {
        .widget {
            cursor        : pointer;
            border-radius : 4px;
            transition    : .2s linear;
            padding       : 1em;
            border        : 1px solid white;

            &:hover {
                border : 1px solid #409EFF;
                /*box-shadow: 0 0 0 2pt #409EFF inset, 0 0 0 4pt white inset;*/
            }

            .copy {
                cursor : copy;
            }

            p {
                &:first-child {
                    margin  : 1em;
                    display : block;
                }

                margin  : 1px;
                display : inline;
            }

            .el-divider {
                i {
                    margin : 0 4px;
                }
            }
        }
    }
</style>
