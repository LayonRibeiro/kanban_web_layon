import styled from "styled-components"

export const Nav = styled.nav`
    display: flex;
    max-width: 100%;
    padding: 1rem 0;
    margin: 0;
    /*position: fixed;
    top: 0; */
    background-color: #D0B339;
    z-index: 1;
    border-radius: 0 0 0.75rem 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    align-items: center;

    h2 {
        padding-left: 0.5rem;
        @media (max-width: 768px) {
            font-size: 1rem;
        }
    }

`

export const ProfileIcon = styled.i`
    position: absolute;
    right: 4rem;
    font-size: 1.75rem;
    margin-top: -15px;
`
export const SignoutIcon = styled.i`
    position: absolute;
    right: 1rem;
    font-size: 1.75rem;
    cursor: pointer;
    margin-top: -14.1px;
`

export const Logo = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    cursor: pointer;
    padding-left: 2em;
`