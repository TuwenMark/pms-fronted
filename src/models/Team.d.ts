/**
 * 用户类别
 */
export type TeamType = {
    teamId: number;
    name?: string;
    description: string;
    maxNum: number;
    currentNum: number;
    expireTime: Date;
    status: number;
    createTime: Date;
    updateTime?: Date;
    userVOList: UserType[];
};