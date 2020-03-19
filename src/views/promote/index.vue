<template>
    <div class="app-container">
        <div class="card-search">
            <el-card shadow="never">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>

        <el-card shadow="never" class="mt-2">
            <div class="table-operate-bar clearfix">
                <span class="operate-title">推广数据</span>
                <div class="operate-button-bar">
                    <el-button size="small" type="primary">操作按钮</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-tooltip content="全屏" placement="top">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="fullScreen" />
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="密度" placement="top">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="column-height" />
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="刷新" placement="top">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="reload" />
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="列设置" placement="top">
                        <el-button type="text" class="operate-button">
                            <svg-icon icon-class="seetings" />
                        </el-button>
                    </el-tooltip>
                </div>
            </div>
            <div class="table-selected-bar clearfix">
                <span class="selected-title">
                    <svg-icon icon-class="info" class="title-icon" />推广数据
                </span>
                <el-button type="text" class="selected-button">清除</el-button>
            </div>
            <el-table
                class="mt-1"
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                fit
                highlight-current-row
                header-cell-class-name="table-header"
            >
                <el-table-column align="center" type="selection" width="95"></el-table-column>
                <el-table-column align="center" label="ID" width="95">
                    <template slot-scope="scope">{{ scope.$index }}</template>
                </el-table-column>
                <el-table-column label="Title">
                    <template slot-scope="scope">{{ scope.row.title }}</template>
                </el-table-column>
                <el-table-column label="Author" width="110" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Pageviews" width="110" align="center">
                    <template slot-scope="scope">{{ scope.row.pageviews }}</template>
                </el-table-column>
                <el-table-column class-name="status-col" label="Status" width="110" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="Display_time" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time" />
                        <span>{{ scope.row.display_time }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination class="pagination" />
        </el-card>
    </div>
</template>

<script>
import { getList } from "@/api/table";
import Pagination from "@/components/Pagination";

export default {
    data() {
        return {
            list: null,
            listLoading: true,
            formInline: {
                user: "",
                region: ""
            }
        };
    },
    components: {
        Pagination
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: "success",
                draft: "gray",
                deleted: "danger"
            };
            return statusMap[status];
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.listLoading = true;
            getList().then(response => {
                this.list = response.data.items;
                this.listLoading = false;
            });
        },
        onSubmit() {
            console.log("submit!");
        }
    }
};
</script>

<style lang="scss" scoped>
.card-search {
    .el-card >>> .el-card__body {
        padding: 20px 20px 0 20px;
    }
}
.table-operate-bar {
    margin: 0 20px;
    line-height: 45px;
    .operate-title {
        font-size: 16px;
        color: #929292;
    }
    .operate-button-bar {
        float: right;
        .operate-button {
            font-size: 16px;
            color: #929292;
        }
    }
}
.table-selected-bar {
    margin: 5px 20px;
    line-height: 40px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    padding: 0 20px;
    border-radius: 2px;
    .selected-title {
        font-size: 14px;
        color: #929292;
        .title-icon {
            color: rgb(24, 144, 255);
            margin-right: 10px;
        }
    }
    .selected-button {
        float: right;
        font-size: 14px;
        color: #929292;
    }
}
.el-card >>> .el-card__body {
    padding: 10px 0;
}
.pagination {
    margin: 20px 20px 0 20px;
}
.clearfix:after {
    content: ""; /*设置内容为空*/
    height: 0; /*高度为0*/
    line-height: 0; /*行高为0*/
    display: block; /*将文本转为块级元素*/
    visibility: hidden; /*将元素隐藏*/
    clear: both; /*清除浮动*/
}
</style>

