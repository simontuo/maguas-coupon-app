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
            <table-operate-bar title="推广数据" />
            <table-selected-bar selected="50" />
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
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";

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
        Pagination,
        TableOperateBar,
        TableSelectedBar
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
.el-card >>> .el-card__body {
    padding: 10px 0;
}
.pagination {
    margin: 20px 20px 0 20px;
}
</style>

