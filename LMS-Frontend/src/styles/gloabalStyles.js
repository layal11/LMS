import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition:  .5s linear;
  }
  p {
    line-height: 1.4rem;
  }
  .userListUser{
  color:${({ theme }) => theme.text};
  }
  .topbar{
   background-color:${({ theme }) => theme.background};
  }
  .sidebar{
   background-color:${({ theme }) => theme.background};
  }
  .btn-primary {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.body};
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all .5s linear;
  }
 input, select, textarea{
    color: ${({ theme }) => theme.textInput};
    background-color:${({ theme }) => theme.input};
    border-color:${({ theme }) => theme.input};
}

textarea:focus, input:focus {
    color: ${({ theme }) => theme.textInput};
    border-color:${({ theme }) => theme.input};
    
}
.featuredItem {

 box-shadow: ${({ theme }) => theme.box};
}
.chart {
box-shadow: ${({ theme }) => theme.box};
}
.widgetSm{
box-shadow: ${({ theme }) => theme.box};
}
.widgetLg{
box-shadow: ${({ theme }) => theme.box};
}
.logo{
 color: ${({ theme }) => theme.text};
}
.topbarIconContainer{
color:${({ theme }) => theme.icon}
}
.sidebarListItem.active,
.sidebarListItem:hover {
  background-color: ${({ theme }) => theme.hover}
}
.userUpdateButton{
background-color: ${({ theme }) => theme.patata};
}
`;

export const lightTheme = {
    body: '#fff',
    text: '#121212',
    primary: '#6200ee',
};

export const darkTheme = {
    body: '#222222',
    text: '#B5B5B5',
    primary: '#bb86fc',
    background:'rgb(35,35,35)',
    input:'#434343',
    textInput:'#B5B5B5',
    hover:'rgb(164,164,176)',
    box: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;',
    icon:'#fff',
    patata:'red'
};