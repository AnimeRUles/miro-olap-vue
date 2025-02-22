import common   from '@/common'
import {
    isEmpty,
    each
}               from 'lodash'
import constant from '@/constant'

export default {
    data(){
        return {
            isSettingsBroadcastThrow: true,
            isSettingsBroadcastSet  : true,
            settings                : {
                isEnabled: false,
                hide     : {
                    lineTagIs: true
                },
            }
        }
    },

    watch: {
        settings: {
            handler( val ){
                if( this.isSettingsBroadcastThrow ){
                    this.isSettingsBroadcastSet = false
                    sessionStorage.setItem( 'settings', JSON.stringify( val ) )
                    // miro.__setRuntimeState(val)
                    miro.broadcastData( val ).then( () => {
                        this.isSettingsBroadcastSet = true
                    } )
                }
            },
            deep: true
        }
    },

    async mounted(){
        miro.onReady( async() => {
            // let state = await miro.__getRuntimeState()
            let settings = sessionStorage.getItem( 'settings' )
            if( ! settings ){
                // await miro.__setRuntimeState(this.settings)
                sessionStorage.setItem( 'settings', JSON.stringify( this.settings ) )
            }else{
                this.settings = JSON.parse( settings )
            }

            miro.addListener( 'DATA_BROADCASTED', this.DATA_BROADCASTED )
        } )
    },

    destroyed(){
        miro.removeListener( 'DATA_BROADCASTED', this.DATA_BROADCASTED )
    },

    methods: {
        DATA_BROADCASTED( data ){
            if( this.isSettingsBroadcastSet ){
                this.isSettingsBroadcastThrow = false
                new Promise( resolve => {
                    this.settings = data.data
                    resolve()
                } ).then( result => {
                    this.isSettingsBroadcastThrow = true
                } )
            }
        },

        async authorize(){
            if( ! await miro.isAuthorized() ){
                return await miro.board.ui.openModal( 'auth/authorize.html'
                    , { width: 400, height: 120 } ) === 'success'
            }

            return true
        },

        log( ...val ){
            console.log( ...val, this.$el.baseURI )
        },

        sleep( ms = 1000 ){
            return new Promise( resolve => setTimeout( resolve, ms ) )
        },

        isDevelopment(){
            return (
                process.env.NODE_ENV === 'development'
            )
        },

        getArray( val ){
            switch( true ){
            case val === null:
            case val === undefined:
                return []
            case Array.isArray( val ):
                return val
            default :
                return [ val ]
            }
        },

        async getWidgetById( id ){
            let w_ = await miro.board.widgets.get( { id } )

            if( w_.length ){
                return w_[ 0 ]
            }

            return null
        },

        async getWidgetById_Object_( wId_ ){
            let _ = {}

            for( const wId of wId_ ){
                let w     = await this.getWidgetById( wId )
                _[ w.id ] = w
            }

            return _
        },

        async getWidgetSelectFirst(){
            let w_ = await miro.board.selection.get()

            if( w_.length ){
                return w_[ 0 ]
            }

            return null
        },

        async getWidgetSelect_(){
            return await miro.board.selection.get()
        },

        async getWidgetTagId_(){
            return await this.getWidgetIdByFrame_( '#' )
        },

        async getWidgetStyleId_(){
            return await this.getWidgetIdByFrame_( '*' )
        },

        async getWidgetIdByFrame_( char ){
            let wId_ = []

            let f_ = await miro.board.widgets.get( {
                type: constant.widget.type.FRAME,
            } )

            if( ! f_.length ) return []

            each( f_, f => {
                if( f.title.charAt( 0 ) === char ){
                    wId_ = wId_.concat( f.childrenIds )
                }
            } )

            return wId_
        },

        async updateWidget( w_ ){
            if( ! w_ ) return

            let wPart_ = []
            this.getArray( w_ ).forEach( w => {
                let wPart = {
                    id           : w.id,
                    clientVisible: w.clientVisible,
                }
                wPart_.push( wPart )
            } )

            await miro.board.widgets.update( wPart_ )
        },
    },
}