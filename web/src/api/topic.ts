import Api from "./index";

export const getTrendingTopicList = async () => {
    try {
        return await Api.get("/topic/trending?limit=4");
    } catch (error) {
        console.error(error);
    }
};

export const getTopicList = async () => {
    try {
        return await Api.get("/topic?limit=500");
    } catch (error) {
        console.error(error);
    }
};

export const getTopicById = async (id: string) => {
    try {
        const response = await Api.get(`/topic/${id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};