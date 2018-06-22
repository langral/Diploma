import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function PrivateRoute(allowedRoles) {
    
    return PrivateComponent => {

        class WithAuthorization extends Component {

            static contextTypes = {
                router: PropTypes.object
            }

            constructor(props, context) {
                super(props);
                this.context = context;
            }

            authorize() {
                const { user } = this.props;
                let allowed = false;
    
                for (let role of user.roles) {
                  
                    if (allowedRoles.includes(role)) {
                        allowed = !allowed;
                        break;
                    }
                }

                return allowed;
            }

            componentWillMount() {
                if (!this.authorize()) {
                    this.context.router.history.push('/');
                }
            }

            componentWillUpdate(nextProps) {
                if (!this.authorize()) {
                    this.context.router.history.push('/');
                }
            }


            render() {
                if (this.authorize()) 
                    return <PrivateComponent {...this.props} />;
                else
                    return <div>Page not found</div>
            }

        }

        function mapStateToProps(state) {
            return {
                user: state.auth,
                authenticated: state.auth.name != null
            };
        }

        return connect(mapStateToProps)(WithAuthorization);

    };
};
