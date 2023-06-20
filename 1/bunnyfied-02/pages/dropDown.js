import Head from "next/head";
import { Dropdown, Text, Grid, User, useSSR } from "@nextui-org/react";

export default function SelectDropDown() {
  const { isBrowser } = useSSR();

  async function handelFilter(filter_option) {
    filter_option = filter_option.split(",").map(String);
    console.log("THIS IS FILTER OPTION", filter_option);
  }

  return (
    isBrowser && (
      <div
        style={{
          backgroundColor: "#E6F1F6",
          height: "960px",
          width: "1820px",
        }}
      >
        <Head>
          <title>Bunnyfied Labs</title>
        </Head>

        <span>
          <Grid.Container
            style={{
              display: "flex",
              marginLeft: "40%",
              paddingTop: "200px",
            }}
            gap={2}
          >
            <Grid>
              <Dropdown placement="bottom-left" color={"red"}>
                <Dropdown.Trigger>
                  <User
                    bordered
                    as="button"
                    size="lg"
                    color="primary"
                    name="BUNNYFIEDLABS PVT LTD"
                    description="@BunnyfiedLabs"
                    src="./img/5.png"
                  />
                </Dropdown.Trigger>
                <Dropdown.Menu
                  onAction={handelFilter}
                  aria-label="User Actions"
                  css={{ backgroundColor: "#CCCCCC" }}
                >
                  <Dropdown.Item
                    key="profile"
                    css={{ height: "$18" }}
                    color={"warning"}
                    textValue
                  >
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      info@bunnyfiedlabs.com
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    My Settings
                  </Dropdown.Item>
                  <Dropdown.Item key="team_settings">
                    Team Settings
                  </Dropdown.Item>
                  <Dropdown.Item key="analytics" withDivider>
                    Analytics
                  </Dropdown.Item>
                  <Dropdown.Item key="system">System</Dropdown.Item>
                  <Dropdown.Item key="configurations">
                    Configurations
                  </Dropdown.Item>
                  <Dropdown.Item key="help_and_feedback" withDivider>
                    Help & Feedback
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" color="error" withDivider>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
        </span>
      </div>
    )
  );
}
