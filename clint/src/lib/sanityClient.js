import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "e6uy0d3q",
  dataset: "production",
  //读查询true	利用缓存加速，降低 API 调用成本
  //写操作false	绕过缓存，确保操作直达服务器
  useCdn: false,
  apiVersion: "2025-02-06",
  //这里注意api的权限要调成editor
  token:
    "skwvXLTrLHkcN0mEsNOq8GAQEtokdMO4ZrX5m0elf1UC4XJVaBy6HXd1WWcyHWzpJ7FdGAv3uFjfyhpg0e1c3ktcSGZrXoexb8Su6l5KdPS09V3nG7tTQgqV6fDWsvDFq72ZkhuTyHsCQUWdmPP7uUxT1Iqe5lTD6GJZIO23mQyIGJBfzWjo",
});
