import { ItsyContainer, ItsyRow } from "@itsy-ui/layout";
import { ItsyNavbar } from "@itsy-ui/navigation";
import { ItsyPage } from "@itsy-ui/app";
import logo from "../styles/imgs/logo.svg";

const PageWrapper = (props) => {
    const navBarSchema = {
        data: {
            items: [
                {
                    id: "back_home",
                    title: "Chinese Bistro",
                    appIcon: logo
                }
            ]
        }
    };
    if (props.pageId !== "cart" && props.pageId !== "success") {
        navBarSchema["data"]["rightItems"] = [{
            isPrimary: true,
            icon: "shopping_cart",
            id: "go_cart"
        }]
    }
    return <ItsyContainer>
        <ItsyRow key="navbar">
            <ItsyNavbar schema={navBarSchema} />
        </ItsyRow>
        <ItsyRow className="page-content-cotainer" key="content" hAlignment="center" padding="15px">
            <ItsyPage className={props.className} schema={{
                pageId: props.pageId
            }} />
        </ItsyRow>
    </ItsyContainer>
}

export default PageWrapper;