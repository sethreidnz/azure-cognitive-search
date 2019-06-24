const STORAGE_ACCOUNT_NAME = process.env["STORAGE_ACCOUNT_NAME"];
const STORAGE_ACCOUNT_KEY = process.env["STORAGE_ACCOUNT_KEY"];
const STORAGE_CONTAINER_NAME = process.env["STORAGE_CONTAINER_NAME"];

const playlists = [
  {
    id: "PLk1Sqn_f33KvtMA4mCQSnzGsZe8qsTdzV",
    title: "JRE Archive - Episodes #1-299",
    sync: "false"
  },
  {
    id: "PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb",
    title: "JRE Archive - JRE #300-499",
    sync: "false"
  },
  {
    id: "PLk1Sqn_f33KtVQWWnE_V6-sypm5zUMkU6",
    title: "JRE Archive - Episodes #500 - 700",
    sync: "false"
  },
  {
    id: "PLk1Sqn_f33KuU_aJDvMPPAy_SoxXTt_ub",
    title: "JRE Archive - Episodes #701 - 1000",
    sync: "false"
  },
  {
    id: "PLk1Sqn_f33Ku0Oa3t8MQjV7D_G_PBi8g1",
    title: "JRE Archive - Episodes #1001 - 1199",
    sync: "false"
  },
  {
    id: "PLk1Sqn_f33KvXucAFMo5Tc5p8e_mcc-5g",
    title: "JRE Archive - Episodes #1200 - Now",
    sync: "true"
  }
];

module.exports = {
  STORAGE_ACCOUNT_NAME,
  STORAGE_ACCOUNT_KEY,
  STORAGE_CONTAINER_NAME,
  playlists
};
