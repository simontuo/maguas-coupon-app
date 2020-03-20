<template>
    <el-table
        v-loading="search.loading"
        :data="search.data"
        element-loading-text="Loading"
        fit
        highlight-current-row
        header-cell-class-name="table-header"
        :size="setting.size"
        @select="handleSelect"
    >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" label="ID" width="55">
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
</template>

<script>
import { getList } from "@/api/table";

export default {
    computed: {
        setting() {
            return this.$store.state.app.table;
        },
        search() {
            return this.$store.state.search;
        }
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
    methods: {
        handleSelect(row) {
            console.log(row);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>