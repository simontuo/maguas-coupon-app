<template>
    <div class="app-container">
        <el-card shadow="never"></el-card>
        <el-card shadow="never" class="mt-2">
            <div class="header">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-table
                class="mt-2"
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                fit
                highlight-current-row
                header-cell-class-name="table-header"
            >
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
            <pagination class="mt-2" />
        </el-card>
    </div>
</template>

<script>
import { getList } from "@/api/table";
import Pagination from "@/components/Pagination";

export default {
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
    data() {
        return {
            list: null,
            listLoading: true
        };
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
        }
    }
};
</script>

