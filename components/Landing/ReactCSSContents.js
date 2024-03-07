function getAppCssContents() {
    return `.App {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
      
.App-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    flex: 1;
}
   
img {
    height: 20vmin;
    pointer-events: none;
}
`
};

module.exports = getAppCssContents;