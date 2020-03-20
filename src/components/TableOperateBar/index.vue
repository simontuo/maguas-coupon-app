<template>
    <div class="table-operate-bar clearfix">
        <span class="operate-title">{{title}}</span>
        <div class="operate-button-bar">
            <el-button size="small" type="primary">操作按钮</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip content="全屏" placement="top">
                <el-button type="text" class="operate-button">
                    <screenfull class="operate-button" />
                </el-button>
            </el-tooltip>
            <el-tooltip content="密度" placement="top">
                <!-- <el-button type="text" class="operate-button">
                    <svg-icon icon-class="column-height" />
                </el-button>-->
                <el-dropdown class="operate-dropdown" trigger="click" @command="handleCommand">
                    <el-button type="text" class="operate-button">
                        <svg-icon icon-class="column-height" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="medium">默认</el-dropdown-item>
                        <el-dropdown-item command="small">中等</el-dropdown-item>
                        <el-dropdown-item command="mini">紧凑</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
</template>

<script>
import Screenfull from "@/components/Screenfull";
export default {
    props: ["title"],
    components: {
        Screenfull
    },
    methods: {
        handleCommand(command) {
            this.$store.dispatch("app/changeTableSize", { command });
        }
    }
};
</script>

<style lang="scss" scoped>
.table-operate-bar {
    margin: 0 20px;
    line-height: 45px;
    .operate-title {
        font-size: 16px;
        color: #929292;
    }
    .operate-button-bar {
        float: right;
        .operate-dropdown {
            margin-left: 10px;
            margin-right: 10px;
            line-height: 1px;
            .operate-button {
                font-size: 16px;
                color: #929292;
            }
        }
        .operate-button {
            font-size: 16px;
            color: #929292;
        }
    }
}
</style>