import React, { Fragment } from "react";
import { Redirect, BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import Favorites from "../Favorites";
import LookupInput from "../Lookup/LookupInput";
import LookupResult from "../Lookup/LookupResult";
import { PulseLoader } from "halogenium";
import CharacterDetails from "../Character/CharacterDetails";
import NotFound from "../Routes/NotFound";
import DetailsRoute from "./DetailsRoute";

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/favorites" component={Favorites} />
        <Route path="/lookup" render={({ history }) => (
          <Fragment>
            <h3 className="app-title"><NavLink to="/">Death Star Lookup</NavLink></h3>
            <LookupInput
              disabled={props.loading}
              handleSearch={e => props.handleSearch(e.target.value.replace(" ", "+"))}
            />
            {props.loading ?
            <div className="loader"> <PulseLoader color="#E7AA44" size="16px" margin="4px"/> </div> :
              <LookupResult
                history={history}
                page={props.page}
                totalPages={props.totalPages}
                changePage={props.changePage}
                characters={props.characters}
                selectCharacter={props.selectCharacter}
                >
                <DetailsRoute exact component={CharacterDetails} />
            </LookupResult>}
            <Favorites main />
          </Fragment>
          )} />
        <Route exact path="/" render={() => <Redirect to="/lookup" />} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
