import { withRouter } from "react-router-dom";
import { assignActivePageClass } from "utils/utils";

const SiteHeader = ({ history }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h2 onClick={() => history.push("/")}>Transportly</h2>
      </div>
      <nav>
        <ul>
          <li
            className={assignActivePageClass(
              history.location.pathname,
              "/flights"
            )}
            onClick={() => history.push("/flights")}
          >
            Flights
          </li>
          <li
            className={assignActivePageClass(
              history.location.pathname,
              "/orders"
            )}
            onClick={() => history.push("/orders")}
          >
            Orders
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(SiteHeader);
