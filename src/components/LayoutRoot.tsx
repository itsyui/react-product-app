import { ItsyContainer, ItsyRow } from "@itsy-ui/layout";
import { ItsyNavbar } from "@itsy-ui/navigation";
import logo from "../styles/imgs/logo.svg";

const navBarSchema = {
    data: {
        items: [
            {
                id: "back_home",
                title: "Ordernow",
                appIcon: logo
            }
        ],
        rightItems: [{
            isPrimary: true,
            icon: "shopping_bag"
        }]
    }
};

const Layout = (props) => {
    return <ItsyContainer>
        <ItsyRow>
            <ItsyNavbar schema={navBarSchema} />
        </ItsyRow>
        <ItsyRow hAlignment="center" padding="15px">
            {props.children}
        </ItsyRow>
    </ItsyContainer>
}

export default Layout;