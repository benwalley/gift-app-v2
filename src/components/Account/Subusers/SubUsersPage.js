import styled from "@emotion/styled";
import SubUser from "./SubUser";
import {subUsers} from "../../../state/selectors/subUsers";
import useRecoilHook from "../../../hooks/useRecoilHook";
import AddSubuserForm from "./AddSubuserForm";
import Divider from "@mui/material/Divider";
import * as PropTypes from "prop-types";
import List from "@mui/material/List";

const ContainerEl = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    grid-template-rows: auto auto 1fr;
    background: var(--background-color);
`

const listStyles = {
    background: 'white',
    padding: 'var(--tile-padding)',
    borderRadius: '10px',
    boxShadow: 'var(--tile-box-shadow)'
}

function CloseIcon(props) {
    return null;
}

CloseIcon.propTypes = {fontSize: PropTypes.string};
export default function SubUsersPage(props) {
    const subusers = useRecoilHook(subUsers)


    return (
        <ContainerEl>
            <AddSubuserForm/>
            <List dense disablePadding={true} sx={listStyles}>
                {subusers && subusers.map(user => {
                    return <SubUser key={user.id} user={user}/>
                })}
            </List>
        </ContainerEl>
    );
}

