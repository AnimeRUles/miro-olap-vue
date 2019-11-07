const isHotReload_key = 'isHotReload_'

export default {
    //region Для определения была ли горячая перезагрузка чтобы не добавлять копии событий
    registerHotReload(key) {
        key = isHotReload_key+key

        if (module && module.hot) {
            sessionStorage.setItem(key, 'false')
            module.hot.addStatusHandler(status => {
                sessionStorage.setItem(key, 'true')
            })
        }
    },

    isHotReload(key) {
        key = isHotReload_key+key

        return sessionStorage.getItem(key) === 'true'
    }
    //endregion
}