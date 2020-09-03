import React, { Fragment } from 'react';

export default class Footer extends React.Component {

    render() {
        return <Fragment>
            <hr className="featurette-divider" />
            <footer style={{ padding: "0 50px" }} className="navbar fixed-bottom">
                <p>© 2020 Litvinov Anatoliy</p>
            </footer>
        </Fragment>;
    }

}