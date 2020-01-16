// nodejs
const express = require('express')

// 获取express实例
const server = express()

// 2.获取渲染器实例
// const { createRenderer } = require('vue-server-renderer')
// const renderer = createRenderer()
const renderer = require('vue-server-renderer').createRenderer()

// 编写路由处理不同url请求
server.get('/', (req, res) => {
    // res.send('<strong>hello world</strong>')
    // 1.创建vue实例
    const Vue = require('vue')
    const app = new Vue({
        template: '<div @click="onClick">{{msg}}</div>',
        data() {
            return {
                msg: 'vue ssr'
            }
        },
        methods: {
            onClick() {
                console.log('do something')
            }
        },
    })
    
    // 3.用渲染器渲染vue实例
    renderer.renderToString(app).then(html =>{
        res.send(html)
    }).catch(err => {
        res.status(500)
        res.send('Internal Server Error, 500!')
    })
})

// 监听端口
server.listen(8888, () => {
    console.log('server');
})
