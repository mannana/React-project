import React from "react";
import HeaderComponent from "../common/header/header.js";
import FooterComponent from "../common/footer/footer.js";

export default class DetailComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            article:"",
            title:""
        }
    }
    render(){
        return(
            <div className="main">
                <HeaderComponent />
                <div className="detail-content">
                    <h3 className="detail-title">{this.state.title}</h3>
                    <div className="detail-article" dangerouslySetInnerHTML={{__html:this.state.article}}></div>
                </div>
                <FooterComponent />
            </div>
        )
    }
    componentDidMount(){
        let link = "article.json?id="+this.props.params.id
        fetch(link)
        .then((response)=>response.json())
        .then((json)=>{
            let data = json.article;
            this.setState({
                article: data.content,
                title: data.title
            })
        })
        .catch((ex)=>{
            console.log('parsing failed',ex);
        })
    }
}
