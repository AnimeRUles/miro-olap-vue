<template>
    <el-row :gutter="8" class="collapse-widget">
        <el-col v-if="wSelect.w">
            <div class="widget"
                 @click="highlightWidget(wSelect.w)">

                <el-divider content-position="center">
                    <i class="el-icon-star-off copy"
                       @click.stop="logWidget(wSelect.w.id)"></i>
                </el-divider>
                <div class="path">
                    <span v-for="(wFrame, index) in wSelect.wFrame_"
                          :key="wFrame.id">
                        <el-link @click.native.stop="goToFrame(wFrame)"
                                 :underline="false"
                        >{{ wFrame.title }}</el-link>
                        <el-divider v-if="index < wSelect.wFrame_.length - 1"
                                    direction="vertical"></el-divider>
                    </span>
                </div>
                <div v-html="wSelect.w.text"></div>
            </div>

            <div v-for="wChild in wChild_"
                 :key="wChild.w.id"

                 class="widget"
                 @click="highlightWidget(wChild.w)">

                <el-divider content-position="center">
                    <i class="el-icon-star-off"></i>
                    <i :class="getLineDirectionIcon(wChild.lineDirection)"
                       class="copy"
                       @click.stop="logWidget(wChild.wLine.id)"></i>
                    <i class="el-icon-full-screen copy"
                       @click.stop="logWidget(wChild.w.id)"></i>
                </el-divider>
                <div class="path">
                    <span v-for="(wFrame, index) in wChild.wFrame_"
                          :key="wFrame.id">
                        <el-link @click.native.stop="goToFrame(wFrame)"
                                 :underline="false"
                        >{{ wFrame.title }}</el-link>
                        <el-divider v-if="index < wChild.wFrame_.length - 1"
                                    direction="vertical"></el-divider>
                    </span>
                </div>
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
                wSelect: {
                    w      : null,
                    wFrame_: [],
                },
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
            getWidgetSelect( w, wFrame_ = [] ){
                return { w, wFrame_ }
            },

            async showWidgetData( e ){
                this.wSelect = this.getWidgetSelect()
                this.wChild_ = []

                if( e.data.length !== 1 ){
                    return
                }

                this.wSelect.w       = await this.getWidgetById( e.data[ 0 ].id )
                this.wSelect.wFrame_ = await this.getFrameByPoint_(
                    this.wSelect.w.x, this.wSelect.w.y )

                let wLine_ = [].concat(
                    await miro.board.widgets.get( {
                        type         : constant.widget.type.LINE,
                        startWidgetId: this.wSelect.w.id,
                    } )
                ).concat(
                    await miro.board.widgets.get( {
                        type       : constant.widget.type.LINE,
                        endWidgetId: this.wSelect.w.id,
                    } )
                )

                each( wLine_, async wLine => {
                    let lineDirection = (
                        wLine.startWidgetId === this.wSelect.w.id
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

                        let wFrame_ = await this.getFrameByPoint_( wChild.x, wChild.y )

                        this.wChild_.push( {
                            w: wChild,
                            wLine,
                            lineDirection,
                            wFrame_,
                        } )
                    }
                } )
            },

            async getFrameByPoint_( x, y ){
                let wFrame_ = []

                let w_ = await miro.board.widgets.__getIntersectedObjects( { x, y } )
                w_.forEach( w => {
                    if( w.type === constant.widget.type.FRAME ){
                        wFrame_.push( w )
                    }
                } )

                //todo
                // sort by z-index (determine by coordinates and sizes
                // about the presence of one frame in another)

                return wFrame_
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
                    x     : w.bounds.left - ( viewport.width / 2 )/* + ( w.bounds.width / 2 )*/,
                    y     : w.bounds.top - ( viewport.height / 2 )/* + ( w.bounds.height / 2 )*/,
                    width : viewport.width,
                    height: viewport.height,
                } )
            },

            async goToFrame( w ){
                await miro.board.viewport.zoomToObject( w )
            },

            async blinkWidget( w ){

                let w_ = [].concat( await miro.board.widgets.get( {
                    type         : constant.widget.type.LINE,
                    startWidgetId: this.wSelect.w.id,
                    endWidgetId  : w.id,
                } ) ).concat( await miro.board.widgets.get( {
                    type         : constant.widget.type.LINE,
                    startWidgetId: w.id,
                    endWidgetId  : this.wSelect.w.id,
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

            .path {
                text-align : left;
            }
        }
    }
</style>
