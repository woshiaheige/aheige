<template>
  <a-layout class="scheme-detail">
    <!-- 头部 -->
    <a-layout-header style="background:#fff" v-margin:bottom="16">
      <a-row>
        <a-col :span="24">
          <span class="reback">
            <a-icon type="arrow-left" @click="reBack" />运维方案
          </span>
          <a-button
            icon="plus"
            type="primary"
            v-margin:left="10"
            @click="resetForm"
            v-if="programmeId"
            >新方案项</a-button
          >
          <a-button
            icon="save"
            type="primary"
            v-margin="'0 10'"
            @click="saveProject"
            >保存方案</a-button
          >
          <a-button
            icon="delete"
            type="danger"
            v-if="programmeId"
            @click="deleteProject"
            >删除</a-button
          >
        </a-col>
        <a-col :span="24">
          <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
            <a-form-item label="方案编号">
              <a-input
                placeholder="方案编号"
                v-model="project.number"
                :disabled="programmeId !== ''"
              ></a-input>
            </a-form-item>
            <a-form-item label="方案名称">
              <a-input v-model="project.name" placeholder="方案名称"></a-input>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-layout-header>
    <!-- 头部end -->
    <a-layout>
      <!-- 左侧方案栏 -->
      <a-layout-sider
        style="background:#fff"
        class="scheme-detail-sider"
        v-margin:right="16"
      >
        <a-list bordered :dataSource="tableData" class="scheme-detail-sider">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            :key="index"
            style="cursor:pointer"
            @click="getMaintainProgrammeItemById(item.id)"
            >{{ item.name }}</a-list-item
          >
        </a-list>
      </a-layout-sider>
      <!-- 左侧方案栏end -->

      <!-- 方案详情 -->
      <a-layout-content
        style="background:#fff"
        class="content"
        v-if="!programmeId"
      >
        <h3>请点击"新方案项"，或者选择一个方案项进行编辑</h3>
      </a-layout-content>
      <a-layout-content
        style="background:#fff"
        class="content"
        v-if="programmeId"
      >
        <h3>方案项详情</h3>
        <a-form
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          ref="formModal"
          :form="form"
        >
          <a-form-item label="方案项名">
            <a-input
              placeholder="方案项名"
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请填写方案项名' }] }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="方案项类型">
            <a-select
              placeholder="方案项类型"
              v-decorator="[
                'type',
                { rules: [{ required: true, message: '请选择方案项目类型' }] }
              ]"
            >
              <a-select-option
                v-for="(item, index) of selectList.projectTypeList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="作业对象">
            <a-select
              placeholder="作业对象"
              v-decorator="[
                'jobObject',
                { rules: [{ required: true, message: '请选择作业对象' }] }
              ]"
            >
              <a-select-option
                v-for="(item, index) of selectList.jobObjectList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="仪器类型">
            <a-select placeholder="仪器类型" v-decorator="['instrumentType']">
              <a-select-option
                v-for="(item, index) of selectList.imstrumentTypeList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="使用的表单">
            <a-select
              placeholder="使用的表单"
              v-decorator="[
                'sheet',
                { rules: [{ required: true, message: '请选择使用的表单' }] }
              ]"
            >
              <a-select-option
                v-for="(item, index) of selectList.itemSheetList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <span slot="label">
              周期类型&nbsp;
              <a-tooltip title="What do you want others to call you?">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-select placeholder="周期类型" v-decorator="['cycleType']">
              <a-select-option
                v-for="(item, index) of selectList.cycleTypeList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="周期单位">
            <a-select placeholder="周期单位" v-decorator="['circleUnit']">
              <!-- <a-select-option value="1">
                Option 1
              </a-select-option> -->
            </a-select>
          </a-form-item>
        </a-form>
        <a-row
          type="flex"
          justify="end"
          v-margin:right="20"
          v-margin:bottom="20"
        >
          <a-col>
            <a-button type="primary" @click="saveProjectItem">
              保存方案项
            </a-button>
            <a-button
              type="danger"
              v-margin:left="20"
              @click="deleteProjectItem"
              >删除</a-button
            >
          </a-col>
        </a-row>
      </a-layout-content>
      <!-- 方案详情end -->
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      programmeId: "", //方案id
      programmeItemId: "", //方案项id
      project: {
        name: "",
        number: ""
      },
      selectList: {
        projectTypeList: [], //方案项目类型
        jobObjectList: [], //作业对象
        imstrumentTypeList: [], //仪器类型
        cycleTypeList: [], //周期类型
        itemSheetList: [] //方案表单
      },
      form: this.$form.createForm(this, { name: "contractEdit" }),
      newProgrammeItemFlag: true //新增，修改方案项状态
    };
  },
  methods: {
    tabChange(e) {
      console.log(e);
    },
    reBack() {
      this.$router.replace({ path: "/i-maintain/scheme" });
    },
    saveProject() {
      if (!this.programmeId) {
        //新增方案
        this.addMaintainProgramme();
      } else {
        this.editMaintainProgramme();
      }
    },
    deleteProject() {
      let _this = this;
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          _this.deleteProjectFn();
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    deleteProjectItem() {
      let _this = this;
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          _this.deleteProjectItemFn();
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    deleteProjectFn() {
      let params = { id: this.programmeId };
      this.$api.iMaintain.deleteMaintainProgramme(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("删除方案成功");
          setTimeout(() => {
            this.reBack();
          }, 1500);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    deleteProjectItemFn() {
      let params = { id: this.programmeItemId };
      this.$api.iMaintain.deleteMaintainProgrammeItemm(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("删除方案项成功");
          this.getTableData();
          this.resetForm();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    resetForm() {
      //重置
      this.programmeItemId = "";
      this.form.resetFields();
    },
    addMaintainProgramme() {
      //新增方案
      let params = {
        name: this.project.name,
        number: this.project.number
      };
      if (this.project.name == "") {
        this.$message.error("请输入方案名称");
        return;
      }
      if (this.project.number == "") {
        this.$message.error("请输入方案编号");
        return;
      }
      this.$api.iMaintain
        .addMaintainProgramme(params)
        .then(res => {
          if (res.data.state == 0) {
            this.programmeId = res.data.data;
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.data.msg);
        });
    },
    editMaintainProgramme() {
      //修改方案
      let params = {
        name: this.project.name,
        number: this.project.number,
        id: this.programmeId
      };
      if (this.project.name == "") {
        this.$message.error("请输入方案名称");
        return;
      }
      if (this.project.number == "") {
        this.$message.error("请输入方案编号");
        return;
      }
      this.$api.iMaintain
        .editMaintainProgramme(params)
        .then(res => {
          this.$message.success(res.data.msg);
        })
        .catch(error => {
          this.$message.error(error.data.msg);
        });
    },
    getTableData() {
      //获取方案列表
      let params = {
        programmeId: this.programmeId
      };
      this.$api.iMaintain
        .maintainProgrammeItem(params)
        .then(res => {
          if (res.data.state == 0) {
            this.tableData = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          this.tableData = [];
        });
    },
    getMaintainProgrammeById() {
      //获取方案详情
      let params = {
        id: this.programmeId
      };
      this.$api.iMaintain
        .getMaintainProgrammeById(params)
        .then(res => {
          if (res.data.state == 0) {
            let data = res.data.data;
            this.project = {
              name: data.name,
              number: data.number
            };
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMaintainProgrammeItemById(id) {
      //获取方案项详情
      this.programmeItemId = id;
      this.$api.iMaintain
        .getMaintainProgrammeItemById({ id: id })
        .then(res => {
          if (res.data.state == 0) {
            let data = res.data.data;
            if (data == null) {
              //新增方案项
              this.newProgrammeItemFlag = true;
            } else {
              this.newProgrammeItemFlag = false;
              this.form.setFieldsValue({
                name: data.name,
                type: data.type,
                jobObject: data.jobObject,
                instrumentType: data.instrumentType,
                cycleType: data.cycleType,
                sheet: data.sheet
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async saveProjectItem() {
      if (!this.programmeItemId) {
        //新增方案项
        await this.addMaintainProgrammeItem();
      } else {
        await this.editMaintainProgrammeItem();
      }
      this.getTableData();
    },
    //新增方案项
    addMaintainProgrammeItem() {
      this.form.validateFields(error => {
        if (error) return;
        let params = this.form.getFieldsValue();
        params.taskId = this.programmeId;
        this.$api.iMaintain.addMaintainProgrammeItem(params).then(res => {
          if (res.data.state == 0) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      });
    },
    //修改方案项
    editMaintainProgrammeItem() {
      let params = this.form.getFieldsValue();
      params.taskId = this.programmeId;
      params.id = this.programmeItemId;
      this.$api.iMaintain.editMaintainProgrammeItem(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    geDictByParamFn() {
      //获取相应字典
      let params = [
        "PROGRAMME_ITEM_TYPE",
        "PROGRAMME_ITEM_JOB_OBJECT",
        "PROGRAMME_ITEM_INSTRUMENT_TYPE",
        "PROGRAMME_ITEM_CYCLE_TYPE",
        "PROGRAMME_ITEM_SHEET"
      ];
      this.$api.common.geDictByParam(params).then(res => {
        if (res.status == 200) {
          let data = res.data;
          data.forEach(item => {
            item.id = +item.id;
            switch (item.code) {
              case "PROGRAMME_ITEM_TYPE": //方案项目类型
                this.selectList.projectTypeList.push(item);
                break;
              case "PROGRAMME_ITEM_JOB_OBJECT": //作业对象
                this.selectList.jobObjectList.push(item);
                break;
              case "PROGRAMME_ITEM_INSTRUMENT_TYPE": //仪器类型
                this.selectList.imstrumentTypeList.push(item);
                break;
              case "PROGRAMME_ITEM_CYCLE_TYPE": //周期类型
                this.selectList.cycleTypeList.push(item);
                break;
              case "PROGRAMME_ITEM_SHEET": //方案表单
                this.selectList.itemSheetList.push(item);
                break;
            }
          });
        }
      });
    },
    generatedId() {
      this.$api.iMaintain.generatedId().then(res => {
        if (res.data.state == 0) {
          this.project.number = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.programmeId = this.$route.query.id || "";
    if (this.programmeId) {
      this.getMaintainProgrammeById();
      this.getTableData();
    } else {
      this.generatedId();
    }
    this.geDictByParamFn();
  }
};
</script>
