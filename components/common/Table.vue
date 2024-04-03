<template>
  <div>
    <div class="card-body">
      <div class="table-responsive">
        <input
          type="text"
          class="mb-1 pl-2 border rounded"
          placeholder="search"
          v-model="search_text"
          v-if="filter_type === 'search'"
        />
        <input
          type="text"
          class="mb-1 pl-2 border rounded"
          placeholder="filter"
          v-else-if="filter_type === 'filter'"
          v-model="filter_text"
        />
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <slot
                v-for="(column, index) in columns"
                :name="`header_${column.field}`"
                :header="column"
              >
                <th
                  :key="index"
                  :style="{
                    cursor:
                      !column.hasOwnProperty('sortable') || column.sortable
                        ? 'pointer'
                        : '',
                  }"
                  @click="
                    !column.hasOwnProperty('sortable') || column.sortable
                      ? sort(column.field)
                      : null
                  "
                >
                  {{ column.label }}
                  <span
                    v-if="!column.hasOwnProperty('sortable') || column.sortable"
                  >
                    <span v-if="sortKey == '' || sortKey !== column.field">
                      <i class="fas fa-sort"></i>
                    </span>
                    <span v-else>
                      <i class="fas fa-sort-down" v-if="sortOrder == 1"></i>
                      <i class="fas fa-sort-up" v-else></i>
                    </span>
                  </span>
                </th>
              </slot>
              <slot name="header_action" v-if="isActions">
                <th>Action</th>
              </slot>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entity, index) in filtered_entities"
              :key="`entity.${index}`"
            >
              <slot
                v-for="(column, ind) in columns"
                :name="`column_${column.field}`"
                :entity="entity"
                :index="index"
              >
                <td :key="`column.${ind}`">
                  {{ getEntityValue(entity, column.field) }}
                </td>
              </slot>
              <slot name="column_action" :entity="entity" v-if="isActions">
                <td>
                  <a href="javascript:" @click="onEdit(entity)"
                    ><i class="fas fa-edit"></i
                  ></a>
                  &nbsp;
                  <a
                    style="color: #dc3545"
                    href="javascript:"
                    @click="onDelete(entity)"
                    ><i class="fas fa-trash"></i
                  ></a>
                </td>
              </slot>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="card-footer clearfix"
      v-if="
        isPagination &&
        !_isEmpty(entities) &&
        entities.hasOwnProperty('meta') &&
        !_isEmpty(entities.meta) &&
        entities.meta.hasOwnProperty('links') &&
        !_isEmpty(entities.meta.links)
      "
    >
      <ul class="pagination pagination-sm m-0 float-right">
        <li
          class="page-item"
          v-for="(link, sl) in entities.meta.links"
          :key="sl"
          :class="[
            link.active ? 'active' : '',
            link.url === null ? 'disabled' : '',
          ]"
        >
          <a
            @click="getData({ url: link.url })"
            class="page-link"
            href="javascript:"
            v-html="link.label"
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: false,
    default: [],
  },
  entities: {
    type: Object,
    required: false,
    default: {},
  },
  isActions: {
    type: Boolean,
    required: false,
    default: true,
  },
  isPagination: {
    type: Boolean,
    required: false,
    default: true,
  },
  filter_type: {
    type: String,
    required: false,
    default: "search",
  },
});

const sortKey = ref("");
const sortOrder = ref(-1);
const filter_text = ref("");
const search_text = ref("");

watch(
  search_text,
  _debounce((new_value, old_value) => {
    getData();
  }, 500)
);

const emit = defineEmits(["onEdit", "onDelete", "getData"]);

const getEntityValue = (entity, field) =>{
  if(field.includes('.')){
    let fields = field.split('.');

    for(var i = 0; i < fields.length; i++){
      entity = entity[fields[i]];
    }
    return entity;
  }else{
    return entity[field];
  }
}

const getData = (params = { url: null, filter: {} }) => {
  if (search_text.value !== "") {
    params.filter = {
      search: _trim(search_text.value),
    };
  }
  emit("getData", params);
};

const onEdit = (entity) => {
  emit("onEdit", entity);
};

const onDelete = (entity) => {
  emit("onDelete", entity);
};

const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1; // Toggle sort order
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

const filtered_entities = computed(() => {
  let sorted = [];
  if (
    !_isEmpty(props.entities) &&
    props.entities.hasOwnProperty("data") &&
    !_isEmpty(props.entities.data)
  ) {
    sorted = [...props.entities.data];
  }

  sorted.sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) {
      return -1 * sortOrder.value;
    } else if (a[sortKey.value] > b[sortKey.value]) {
      return 1 * sortOrder.value;
    }
    return 0;
  });

  if (props.filter_type === "filter" && filter_text.value != "") {
    return sorted.filter((entity) => {
      let return_value = false;

      props.columns.forEach((column) => {
        if (
          (!column.hasOwnProperty("filterable") || column.filterable) &&
          entity.hasOwnProperty(column.field) &&
          entity[column.field] &&
          entity[column.field]
            .toString()
            .toLowerCase()
            .trim()
            .includes(filter_text.value.toLowerCase().trim())
        ) {
          return_value = true;
        }
      });

      return return_value;
    });
  } else {
    return sorted;
  }
});
</script>

<style lang="scss" scoped>
</style>