<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :url="url" />
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="推广数据" />
                <table-selected-bar selected="50" />
                <m-table class="mt-1" />
                <pagination />
            </div>
        </m-card>
    </div>
</template>

<script>
import { getList } from "@/api/table";
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard
    },
    data() {
        return {
            url: ""
        };
    }
};
</script>

<style lang="scss" scoped>
</style>

