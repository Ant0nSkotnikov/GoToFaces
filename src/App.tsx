import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './App.css';


var port = "http://192.168.234.77:8080/participants"
var portMain = "http://192.168.234.77:8080/camps"
var thiscamp = ""


class Page extends React.Component<any, any>{
    constructor(props){
        super(props)
        this.state = {
            camp: "Лето 2021 смена 2",
            photos: ["https://im0-tub-ru.yandex.net/i?id=69fd26e1f12db2cf2598030975e8faca&n=13",
                "https://vev.ru/blogs/wp-content/uploads/2015/04/sejdzhi-mamija.jpg",
                "https://im0-tub-ru.yandex.net/i?id=ca6755b3dada2e6ad04c1600256e65b9&n=13",
                "https://storge.pic2.me/c/1360x800/959/5f8f4e77cbb507.43177050.jpg",
                "http://wallpapers-images.ru/1680x1050/cats/wallpapers/wallpapers-cat-33.jpg",
                "https://img.youscreen.ru/wall/14977155328705/14977155328705_1920x1200.jpg",
                "https://im0-tub-ru.yandex.net/i?id=84d0befafe596c41b3358b2ce1c33944&n=13",
                "https://img2.goodfon.ru/original/1920x1080/4/81/kotyata-troe-sidyat-smotryat.jpg",
                "https://im0-tub-ru.yandex.net/i?id=9db146002833db6d7cfe8301e884598b&ref=rim&n=33&w=270&h=225",
                "https://sun9-67.userapi.com/c858332/v858332314/16d345/8l_2w7cCbN8.jpg",
                "https://img5.goodfon.ru/original/1920x1315/1/8e/kotiata-malyshi-kotionok-mordochka-vzgliad.jpg",
                "https://img5.goodfon.ru/original/1680x1050/6/dd/korzina-kotiata-belyi-fon.jpg",
                "https://im0-tub-ru.yandex.net/i?id=fa623abea11d9d099d33a8cbde1fd3c2&ref=rim&n=33&w=337&h=225",
                "https://animalreader.ru/wp-content/uploads/2015/04/ostrov-koshek-animalreader.ru_.jpg",
                "https://im0-tub-ru.yandex.net/i?id=fa5d306d0e48fdf2ba12a7b2ff2b02b1&n=13",
                "https://im0-tub-ru.yandex.net/i?id=538e20e19e59f42760eeb8a5fcb50814&n=13",
                "https://i.servimg.com/u/f56/19/85/12/29/b9508310.jpg",
                "https://im0-tub-ru.yandex.net/i?id=82c1cee36627409295920fd7140ac803&n=13",
                "https://im0-tub-ru.yandex.net/i?id=7e5243c280f61db7a268043d9e28427e&n=13"
            ],
        }
    }


    render(){
        let photos = []

        for (var i in this.state.photos){
            photos.push(<img src={this.state.photos[i]} className="photo"/>)
        }

        var site = ""

        if (thiscamp="summmer 2021 A2"){
            site = "/camp_2021_A2"
        }
        else{
            site = "/camp_2021_A1"
        }

        return <div>
            <a className="returning" href={site}>{"← " + this.state.camp}</a>
            <div className="photos">{photos}</div>
        </div>
    }
}

//---------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

interface CampProps {
    photo: string
    camp: string
}
interface CampState {
    camps: any
}
class Person extends React.Component<any, any>{
    render(){
        return <div className="person">
            <img src={this.props.photo} className="personalphoto"/>
            <div><strong><u>{this.props.name}</u></strong></div>
        </div>
    }
}


class Inf extends React.Component<any, any>{
    render(){
        return <div className="inform"><strong>{this.props.name}</strong>{this.props.text}</div>
    }
}


class Orgs extends React.Component<any, any>{
    render(){
        return <div className="card">
            <Person
                name={this.props.name}
                photo={this.props.photo}
            />
            <div className="information">
                <Inf name="Telegram: " text={this.props.telegram}/>
                <Inf name="Смены: " text={this.props.camp}/>
            </div>
        </div>
    }
}


class Members extends React.Component<any, any>{
    render(){
        return <div className="card">
            <Person
                name={this.props.name}
                photo={this.props.photo}
            />
            <div className="information">
                <Inf name="Telegram: " text={this.props.telegram}/>
                <Inf name="Домик: " text={this.props.house}/>
                <Inf name="Смены: " text={this.props.camp}/>
            </div>
        </div>
    }
}


class List extends React.Component<any, any>{
    constructor(props){
        super(props)
        this.state = {
            listOrgs: [{id: 12, name: "Ильина Алёна", photo: "https://im0-tub-ru.yandex.net/i?id=0855beedee265d35a34c6556264d32ef&n=13", telegram: "Алёна", specialization: "директор GoTo", camp: "описать все невозможно"}],
            listMembers: [
                {id: 12, name: "Баркевич Полина", photo: "https://stihi.ru/pics/2021/01/23/1043.jpg", telegram: "Пингвин Лепи", house: 13, camp: "лето 2020 смена 1, лето 2021 смена 2"},
                {id: 12, name: "Жукова Алиса", photo: "https://im0-tub-ru.yandex.net/i?id=4b22bba5983d30fa9bf2b358f0ce4193&n=13", telegram: "Алиса Жукова", house: 13, camp: "лето 2020 смена 1, лето 2021 смена 2"},
                {id: 12, name: "Журавлёва-Емельянено Агата", photo: "https://sun9-36.userapi.com/Z0jrvyWutdqzsCGwZSzI1Wki6T7IeISwT8v6FA/gDv79XRZooI.jpg", telegram: "Агата неКристи", house: 14, camp: "лето 2020 смена 2, лето 2021 смена 2"},
                {id: 12, name: "Нгуен Кат Тиен Виолетта", photo: "https://im0-tub-ru.yandex.net/i?id=d34c1c4e3deaa99babc6548335e4ef86&n=13", telegram: "Виолетта", house: 14, camp: "лето 2021 смена 2"},
                {id: 12, name: "Плотникова Таисия", photo: "https://im0-tub-ru.yandex.net/i?id=80a587205e153743e275a25262d3f2da&n=13", telegram: "taisiaa", house: 14, camp: "лето 2021 смена 2"}
            ],
        }
    }
//-------------------------------------------------------------------------------------------------------
    componentDidMount() {
        fetch(port)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(
                        function(oldState, oldProps) {
                            var listmembers = result[0]
                            var listorgs = result[1]
                            return {
                                listOrgs: result[1],
                                listMembers: result[0],
                            }
                        }
                    );
                },
            )
    }
//-------------------------------------------------------------------------------------------------------
    render(){
        if (this.props.camp == "Лето 2021 смена 2"){
            thiscamp="summmer 2021 A2"
        }
        else{
            thiscamp="summmer 2021 A1"
        }
        var orgs = []
        for (var i in this.state.listOrgs){
            let x = this.state.listOrgs[i]
            orgs.push(<Orgs
                id = {x.id}
                name = {x.name}
                photo = {x.photo}
                telegram = {x.telegram}
                camp = {x.camp}
            />)
        }
        var members = []
        for (var i in this.state.listMembers){
            let x = this.state.listMembers[i]
            members.push(<Members
                id = {x.id}
                name = {x.name}
                photo = {x.photo}
                telegram = {x.telegram}
                house = {x.house}
                camp = {x.camp}
            />)
        }
        return <div className="page">
            <div className="hrefs">
                <a className="back" href="/">Назад</a>
                <a className="campphotos" href="/photos">Фото смены</a>
            </div>
            <h1 className="camp">{this.props.camp}</h1>
            <h2 className="title">Преподаватели/Организаторы</h2>
            <div className="listcards">
                {orgs}
            </div>
            <h2 className="title">Участники</h2>
            <div className="listcards">
                {members}
            </div>
         </div>
    }
}
//--------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
// явно указывает, что есть в пропсах и какие там типы
class ThisCamp extends React.Component<any, any>{
    render() {
        return <div className="thiscamp" style={{backgroundImage: `url(${this.props.photo})`}} >
            <div className="line">
                <a href={this.props.site} className="name">{this.props.camp}</a>
            </div>
        </div>
    }
}
// any, any игнорирует ошибки
class Main extends React.Component<any, any>{
    constructor(props){
        super(props)
        this.state = {
            camps: [
            ["Лето 2021 смена 2",
             "https://img5.goodfon.ru/original/1366x768/6/ff/koshki-kotiata-luzhaika-tsvety-para-parochka-dva-duet-koteno.jpg"],
             ["Лето 2021 смена 1",
             "https://www.nastol.com.ua/download.php?img=202004/1280x800/nastol.com.ua-395929.jpg"]]
        }
    }

    /*componentDidMount() {
        fetch(portMain)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(
                        function(oldState, oldProps) {
                            return {
                                camps: result,
                            }
                        }
                    );
                },
            )
    }*/



    render(){
        let camps = []
        camps.push(<ThisCamp camp={this.state.camps[0][0]} photo={this.state.camps[0][1]} site="/camp_2021_A2"/>)
        camps.push(<ThisCamp camp={this.state.camps[1][0]} photo={this.state.camps[1][1]} site="/camp_2021_A1"/>)

        return <div className="all">
            <h1 className="title1">GoTo в лицах</h1>
            <div className="camps">{camps}</div>
        </div>
    }
}

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/camp_2021_A2">
            <List camp="Лето 2021 смена 2"/>
          </Route>
          <Route path="/camp_2021_A1">
            <List camp="Лето 2021 смена 1"/>
          </Route>
          <Route path="/photos">
            <Page />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
