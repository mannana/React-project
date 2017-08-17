import React from "react";
import ReactDom from "react-dom";
import {Card} from "antd";
import {Link} from "react-router";
import HeaderComponent from "../common/header/header.js";
import FooterComponent from "../common/footer/footer.js";
import "../../css/page.css"
export default class IndexComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            login: false
        }
    }
    componentDidMount(){
        fetch("/index.json")
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({
                articles:json.data.article
            })
        })
        .catch((ex)=>{
            console.log("parsing failed",ex);
        })
    }
    render(){
        return(
            <div className="main">
            <HeaderComponent title="首页"/>
            <Card title="VOA（美国之音）慢速英语,常速英语,官网最新内容在线收听。" className="content">
                {
                    this.state.articles.map((value,key)=>{
                        if(value.id<=19684){
                            return (
                                <div className="content-item" key={value.id}>
                                    <Link to={"/detail/"+value.id}>
                                        <span className="content-item-category" style={{color:value.color}}>[ {value.categoryName} ]</span>
                                        {value.title} ({value.date})
                                        {value.new? <img className="content-item-new" src={require("../../images/new.gif")} /> : ""}
                                    </Link>
                                </div>
                            )
                        }

                    })
                }
            </Card>
            <FooterComponent />
    </div>
        )
    }
}
