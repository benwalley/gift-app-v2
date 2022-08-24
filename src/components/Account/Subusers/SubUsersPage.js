import styled from "@emotion/styled";
import SubUser from "./SubUser";
import {subUsers, updateSubUsers} from "../../../state/selectors/subUsers";
import useRecoilHook from "../../../hooks/useRecoilHook";
import AddSubuserForm from "./AddSubuserForm";
import List from "@mui/material/List";
import {useSetRecoilState} from "recoil";
import {useEffect} from "react";

const ContainerEl = styled.div`
    padding: var(--mobile-page-margin);
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    grid-template-rows: auto auto 1fr;
    background: var(--background-color);
    max-width: var(--max-content-width);
  margin: 0 auto;
    
    @media only screen and (min-width: 1000px) {
        padding: var(--desktop-page-margin);
    }
`

const listStyles = {
    background: 'white',
    padding: 'var(--tile-padding)',
    borderRadius: '10px',
    boxShadow: 'var(--tile-box-shadow)'
}

export default function SubUsersPage(props) {
    const subusers = useRecoilHook(subUsers)
    const update = useSetRecoilState(updateSubUsers)

    useEffect(() => {
        update(0)
    }, [update]);

    return (
        <ContainerEl>
            <AddSubuserForm/>
            <List dense disablePadding={true} sx={listStyles}>
                {subusers && subusers.map(user => {
                    return <SubUser key={user?.id} user={user}/>
                })}
            </List>
        </ContainerEl>
    );
}

