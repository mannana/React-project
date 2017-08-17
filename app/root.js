import React from "react";
import Reactom from "react-dom";
import {Router,Route,browserHistory} from "react-router";
import {createStore} from "redux";
import IndexComponent from "./components/index/index.js";
import DetailComponent from "./components/detail/detail.js";
import ListComponent from "./components/list/list.js";
import reducer from "./reducer/reducer.js";
import {Provider} from "react-redux";

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());

class Root extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={IndexComponent}></Route>
                    <Route path="/detail/:id" component={DetailComponent}></Route>
                    <Route path="/cateList/:cate" component={ListComponent}></Route>
                </Router>
            </Provider>
        )
    }
}
Reactom.render(<Root />,document.getElementById("root"));
