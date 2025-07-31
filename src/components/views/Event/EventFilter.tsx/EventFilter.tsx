import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import React, { Fragment, useEffect } from "react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";

const EventFilter = () => {
  const { control, setValue, dataCategory, isSuccessGetCategory } =
    useEventFilter();
  const {
    handleChangeCategory,
    handleChangeisOnline,
    handleChangeisFeatured,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    setValue("category", `${currentCategory}`);
    setValue("isOnline", `${currentIsOnline}`);
    setValue("isFeatured", `${currentIsFeatured}`);
  }, [isSuccessGetCategory]);
  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessGetCategory ? (
          <Fragment>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  labelPlacement="outside"
                  variant="bordered"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
                  placeholder="Search category here..."
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name="isOnline"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  labelPlacement="outside"
                  placeholder="Select online / offline"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  onChange={(e) => handleChangeisOnline(e.target.value)}
                >
                  <SelectItem key="true" value="true">
                    Online
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    Offline
                  </SelectItem>
                </Select>
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Select
                  {...field}
                  label="Feature"
                  labelPlacement="outside"
                  placeholder="Select Feature Event"
                  variant="bordered"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  onChange={(e) => handleChangeisOnline(e.target.value)}
                >
                  <SelectItem key="true" value="true">
                    Yes
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    No
                  </SelectItem>
                </Select>
              )}
            />
          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
