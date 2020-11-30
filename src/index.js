/*
 * @Descripttion: 
 * @version: 
 * @@Company: DCIT-SH
 * @Author: Oneself
 * @Date: 2020-11-30 13:18:05
 * @LastEditors: Oneself
 * @LastEditTime: 2020-11-30 16:54:55
 * @Statu: TODO: 
 */
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component{
    render(){
        return(
            <div>Hello React!</div>
    )
    }
}
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
