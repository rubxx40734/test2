

let data = []

function init(){
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
   .then(function(respones){
       data = (respones.data)
       render()
       renderList()
   })
}
//  整理資料
function render(){
    let dataObj = {}
    data.forEach(function(item){
        if(dataObj[item.area] == undefined){
            dataObj[item.area] = 1
        }else{
            dataObj[item.area]+=1
        }
    })
    const dataAry = Object.keys(dataObj)
    let newData = []
    dataAry.forEach(function(item){
       let obj = []
       obj.push(item)
       obj.push(dataObj[item])
       newData.push(obj)
    })
    //丟入C3
    const chart = c3.generate({
        bindto: ".wrap",
        data: {
          columns: newData,
          type : 'donut',
        },
        donut: {
          title: "地區"
        }
      });
}
function renderList(){
    const list = document.querySelector('.list')
    let str = ''
    data.forEach(function(item){
        let content = `<li>${item.name}</li>`
        str += content
    })
    list.innerHTML = str
}
init()

const btn = document.querySelector('.btn')
btn.addEventListener('click',function(e){
    const text = document.querySelector('.text').value
    let obj = {
        id: 0,
        name: text,
        imgUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        area: "高雄",
        description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        group: 87,
        price: 1400,
        rate: 10
    }
    data.push(obj)
    render()
    renderList()

})