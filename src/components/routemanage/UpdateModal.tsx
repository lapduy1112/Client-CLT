import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import FormHelperText from "@mui/joy/FormHelperText";
import Stack from "@mui/material/Stack";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Option from "@mui/joy/Option";
import { useSearchParams } from "next/navigation";
import { getErrorMessage } from "@/libs/common/utils/error";
import axios, { AxiosError } from "axios";
import { getRouteById, updateRoute } from "@/libs/common/utils/fetchRoute";
import { PortUpdateInterface } from "@/libs/common/interfaces/update-port.interface";
import { RouteUpdateInterface } from "@/libs/common/interfaces/update-route.interface";
const validationSchema = Yup.object({
  startPort: Yup.string(),
  endPort: Yup.string(),
  distance: Yup.string(),
});
export default function UpdateRouteModal({
  open,
  setOpen,
  id,
  setSelectedId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const searchTerm = searchParams.get("searchTerm");
  const page = searchParams.get("page");
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["route", { id: id }],
    queryFn: () => getRouteById(id),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  console.log("data", data);
  const mutation = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: RouteUpdateInterface;
      id: string;
    }) => {
      return await updateRoute(data, id);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["route", { id: data.id }], data),
        queryClient.invalidateQueries({
          queryKey: ["route", { sort, searchTerm, page }],
        }),
        toast.success("Route Updated successfully"),
        setSelectedId("");
      setOpen(false);
    },
    onError: (error: Error | AxiosError) => {
      setSelectedId("");
      setOpen(false);
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      startPort: undefined,
      endPort: undefined,
      distance: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        id: id,
        data: {
          startPort: values.startPort,
          endPort: values.endPort,
          distance: values.distance,
        },
      });
    },
  });
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setSelectedId("");
        }}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Update Route</DialogTitle>
          <Divider />
          {isSuccess && data && (
            <form onSubmit={formik.handleSubmit} id="udpatedForm">
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" }, my: 1 }}>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <FormLabel>Id</FormLabel>
                    <FormControl
                      sx={{
                        display: { sm: "flex-column", md: "flex-row" },
                        gap: 2,
                      }}>
                      <Input
                        size="sm"
                        placeholder="Id"
                        defaultValue={data?.id}
                        disabled
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Start Port</FormLabel>
                      <Input
                        size="sm"
                        placeholder="StartPort"
                        id="startPort"
                        name="startPort"
                        defaultValue={data?.startPort?.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.startPort}
                        error={
                          formik.touched.startPort &&
                          Boolean(formik.errors.startPort)
                        }
                      />
                      {formik.touched.startPort &&
                        Boolean(formik.errors.startPort) && (
                          <FormHelperText>
                            {formik.errors.startPort}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>End Port</FormLabel>
                      <Input
                        size="sm"
                        placeholder="EndPort"
                        id="endPort"
                        name="endPort"
                        defaultValue={data?.endPort?.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.endPort}
                        error={
                          formik.touched.endPort &&
                          Boolean(formik.errors.endPort)
                        }
                      />
                      {formik.touched.endPort &&
                        Boolean(formik.errors.endPort) && (
                          <FormHelperText>
                            {formik.errors.endPort}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Distance</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Distance"
                        id="distance"
                        name="distance"
                        defaultValue={data?.distance}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.distance}
                        error={
                          formik.touched.distance &&
                          Boolean(formik.errors.distance)
                        }
                      />
                      {formik.touched.distance &&
                        Boolean(formik.errors.distance) && (
                          <FormHelperText>
                            {formik.errors.distance}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>CreatedAt</FormLabel>
                      <Input
                        size="sm"
                        defaultValue={data?.createdAt}
                        disabled
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>UpdatedAt</FormLabel>
                      <Input
                        size="sm"
                        defaultValue={data?.updatedAt}
                        disabled
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          )}

          <DialogActions>
            <Button
              form="udpatedForm"
              sx={{ backgroundColor: "#000000" }}
              variant="solid"
              color="neutral"
              type="submit"
              disabled={isPending || mutation.isPending}>
              Update
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false), setSelectedId("");
              }}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
