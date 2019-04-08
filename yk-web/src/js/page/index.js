require(['../config'], function() {
    require(['mui', 'flex', 'bscroll'], function(mui, flex, BScroll) {
        console.log(mui)
        var BS = null;
        var page = 1;
        var total = 0;
        var flow = document.querySelector('.flow');
        var { a, b } = [
            [],
            []
        ]

        function init() {
            BS = new BScroll('section', {
                probeType: 2
            })
            mui.init();
            // getData('现货', 0, 10)
            getData()
            wratFull()
            better()
            pullUp()
            tap()
        }
        //ajax请求
        function getData(type) {
            mui.ajax('/info/getData', {

                data: {
                    type: type,
                    skip: 0,
                    limit: 10
                },
                success: function(data) {
                    if (data.code === 1) {
                        render(data.data)
                    }
                }
            })
        }
        //列表渲染
        function render(data) {
            console.log(data)

            flow.innerHTML = data.map(function(v) {
                return `<li>
                                <img src="image/${v.img}" style="height:${v.imgH}px">
                                <h1>${v.title}</h1>
                                <p>
                                    <span>${v.use}</span>
                                    <span>${v.shu}</span>
                                </p>
                            </li>`
            }).join('')

            BS.refresh();
            tap()
        }

        function tap() {
            var flow = document.getElementById('#flow')
            mui('#flow').on('tap', 'li', function() {
                location.href = '../xiang.html'
            })
        }

        function better() {
            BS.on('scroll', function() {

                if (this.y < this.maxScrollY - 50) {
                    pullUp.innerHTML = '释放加载更多...';
                    pullUp.classList.add('flip');
                } else {
                    pullUp.innerHTML = '上拉加载';
                    pullUp.classList.remove('flip');
                }



            })
            BS.on('scrollEnd', function() {
                if (pullUp.classList.contains('flip')) {
                    pullUp.classList.remove('flip');
                    pullUpFn();
                }

            })

        }


        function pullUp() {
            page++;
            page = 1;
        }

        //瀑布流
        function wratFull() {
            if (!a.length) {
                a.push(item)
                return
            } else if (!b.length) {
                b.push(item)
                return
            }
            if (a.reduce((s, v) => s + v.imgH * 1, 0) < b.reduce((s, v) => s + v.imgH * 1, 0)) {
                a.push(item)
            } else {
                b.push(item)
            }
            return [a, b]
        }

        init()
    })
})