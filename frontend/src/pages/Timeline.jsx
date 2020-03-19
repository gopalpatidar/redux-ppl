import React , {useEffect} from "react";
import Categories from "../components/Categories";
import { Switch, Route } from "react-router-dom";
import Uploadpost from "../components/Uploadpost";
import Profile from "../components/Profile";
import Singlepost from "../components/Singlepost";

function Timeline(props){
   useEffect(()=>{
    if (localStorage.getItem("Email")) {}
    else{
      this.props.history.push("/");
    }
   },[])
    return (
      <>
        <div className="container">
          <div className="content">
            <Categories
              {...props}
            />
            <Switch>
              <Route
                exact
                path="/timeline"
                render={props => (
                  <Profile
                    {...props}
                  />
                )}
              />
              <Route
                path="/timeline/upload"
                component={Uploadpost}
                {...props}
              />
              <Route
                path="/timeline/singlepost"
                component={Singlepost}
                {...props}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }

export default Timeline;
