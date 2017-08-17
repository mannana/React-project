import React from "react";
import {Card} from "antd";
import {Link} from "react-router";
import HeaderComponent from "../common/header/header.js";
import FooterComponent from "../common/footer/footer.js";

export default class ListComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        let link = this.props.params.cate+".json";
        fetch(link)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({
                list:json.data.list
            })
        })
        .catch((ex)=>{
            console.log('parsing failed',ex);
        })

    }
    render(){
        return(
            <div className="main">
            <HeaderComponent title="列表"/>
            <Card title="VOA 分类列表" className="content">
                {
                    this.state.list.map((value,key)=>{
                        return (
                            <div className="content-item" key={value.id+key}>
                                <Link to={"/detail/"+value.id}>
                                    {value.title}
                                </Link>
                            </div>
                        )
                    })
                }
            </Card>
            <FooterComponent />
            </div>
        )
    }
}
