<template>
    <div id="app">
        <p>
            The application is not authorized for the current user
        </p>
        <el-button @click="Authorize">Authorize</el-button>
    </div>
</template>

<script>
    export default {
        name      : 'Authorize',
        components: {},

        data: function(){
            return {}
        },

        methods: {
            async Authorize(){
                await miro.authorize( {
                    response_type: 'token',
                    redirect_uri : 'https://' + window.location.host + '/auth/success.html'
                } )

                if( await miro.getToken() ){
                    miro.board.ui.closeModal( 'success' )
                }else{
                    miro.showErrorNotification( 'Application authorization error' )
                }
            },
        },
    }
</script>

<style>
    #app {
        height         : calc(100vh - 2em);
        text-align     : center;
        vertical-align : center;
    }
</style>
