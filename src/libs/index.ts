import { IConfigListOptions } from "comp/common/PageModel/types";

const isEmpty = (value: any) => {
  return value === "" || typeof value === "undefined" || value === null;
};
import { getTags } from "api/tags";
const normalizedTags = (): Promise<IConfigListOptions[]> => {
  return new Promise((resolve) => {
    getTags().then(
      (v) => {
        const res = v.data.map((item: any) => {
          return {
            field: item._id,
            name: item.name,
          };
        });
        resolve(res);
      },
      (e) => {
        resolve([]);
      }
    );
  });
};
export { isEmpty, normalizedTags };
