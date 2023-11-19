import "./App.css";

import { Button, ConfigProvider, Layout } from "antd";

import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E7E9E2",
        },
      }}
    >
      <Layout className="layout">
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <h1 className="main-title">QUIZ APP</h1>
          </div>
          <div>
            <h2 className="secondary-title">Select Category</h2>
            <Link to="/questions/mythology">
              <Button block className="option-button">
                Mythology
              </Button>
            </Link>

            <Link to="/questions/sports">
              <Button block className="option-button">
                Sports
              </Button>
            </Link>

            <Link to="/questions/history">
              <Button block className="option-button">
                History
              </Button>
            </Link>

            <Link to="/questions/video_games">
              <Button block className="option-button">
                Video Games
              </Button>
            </Link>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Category;
