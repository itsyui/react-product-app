import {
    Switch,
    useHistory,
    Route,
    Redirect
} from "react-router-dom";
import { useEffect } from "react";
import { useTransition, WidgetsFactory, DataLoaderFactory, IAppSchemaProvider } from "@itsy-ui/core";
import { ItsyProvider } from "@itsy-ui/app";
import { PageWrapper } from "./components";

const Actions = {
    State: {
        NAVIGATE_URL: "NAVIGATE_URL",
        NAVIGATION_DONE: "NAVIGATION_DONE",
        INITIALIZE_DONE: "INITIALIZE_DONE",
        INITIALIZE: "INITIALIZE"
    },
    INIT: "Actions.INIT"
};

const initialState = {
    history: null,
    isAuthenticated: false
};

function reducer(state, action) {
    switch (action.type) {
        case Actions.INIT:
            return {
                history: action.history,
                isAuthenticated: action.isAuthenticated
            }
        default:
            return state === undefined ? initialState :
                Object.keys(state).length === 0 ? initialState : state;
    }
}

function doInit(event) {
    return async (_, dispatch, transition) => {
        const dataLoader = WidgetsFactory.instance.services["DataLoaderFactory"] as DataLoaderFactory;
        const commandLoader: any = dataLoader.getLoader("commandLoader");
        const schemaProvider = dataLoader.getLoader<IAppSchemaProvider>("appSchemaProvider");

        const customCommand = await schemaProvider.getSchema(`/app/command/data`);
        // initialize all commands
        commandLoader.generateCommand(customCommand);

        dispatch({
            type: Actions.INIT,
            history: event.history,
            isAuthenticated: true
        });
        transition({
            type: Actions.State.INITIALIZE_DONE,
        });
    };
}

function doNavigateUrl(event) {
    return (getState, dispatch, transition) => {
        let { history } = getState();
        if (event.history) {
            history = event.history;
        }
        history.push(event.url);
        transition({
            type: Actions.State.NAVIGATION_DONE,
        });
    };
}

const stateJSON = {
    "initial": "onLoaded",
    "states": {
        "onLoaded": {
            "on": {
                "INITIALIZE": "init",
                "NAVIGATE_URL": "navigateUrl"
            },
        },
        "init": {
            "onEntry": [
                "onInit",
            ],
            "on": {
                "INITIALIZE_DONE": "onLoaded",
            },
        },
        "navigateUrl": {
            "onEntry": [
                "onNavigateUrl",
            ],
            "on": {
                "NAVIGATION_DONE": "onLoaded",
            },
        }
    },
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNavigateUrl: (event) => dispatch(doNavigateUrl(event)),
        onInit: (event) => dispatch(doInit(event))
    };
};

const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact path="/home" render={() => <PageWrapper className="home-page" key="home" pageId="home" />} />
            <Route exact path="/details" render={() => <PageWrapper className="product-details" key="details" pageId="details" />} />
            <Route exact path="/cart" render={() => <PageWrapper className="cart-page" key="cart" pageId="cart" />} />
            <Route exact path="/success" render={() => <PageWrapper className="success-page" key="success" pageId="success" />} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
        </Switch>
    );
};

export const Main: React.FC = (props: any) => {
    const history = useHistory();
    const [, transition]: any[] = useTransition("Main", reducer, mapDispatchToProps, stateJSON);
    useEffect(() => {
        transition({
            type: Actions.State.INITIALIZE,
            history
        });
    }, []);
    return (
        <ItsyProvider>
            <PublicRoutes />
        </ItsyProvider>
    );
};