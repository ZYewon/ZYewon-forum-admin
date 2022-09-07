import request from "@/service";

const getCaptcha = (sid: string) => {
  return request.get({
    url: "/public/getCaptcha",
    params: {
      sid,
    },
  });
};

export { getCaptcha };
