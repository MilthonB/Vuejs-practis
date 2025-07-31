import { getProductById } from "@/modules/products/actions/get-product-by-id.action";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { defineComponent, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import * as yup from 'yup';

import { useFieldArray, useForm } from 'vee-validate';
import CustomInput from "@/modules/common/components/CustomInput.vue";
import CustomTextArea from "@/modules/common/components/CustomTextArea.vue";
import { createUpdateProductAction } from "@/modules/products/actions/create-update-product.action";
import { useToast } from "vue-toastification";



const validationSchema = yup.object({
  title: yup.string().required('Este campo es super importante').min(3, 'Mínimo de 3 letras!!!'),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});


export default defineComponent({
    components: {
        CustomInput,
        CustomTextArea
    },
    props: {
        productId: {
            type:String,
            required: true
        },

    },
    setup(props) {
        const toast = useToast();
        const router = useRouter()
        const {data:product, isError, isLoading, refetch} = useQuery({
            queryKey:['product', props.productId],
            queryFn:()=> getProductById(props.productId),
            retry: false
        })

        const { mutate, isPending, isSuccess: isUpdateSucess, data: updatedProduct} =  useMutation({
            mutationFn: createUpdateProductAction
        });


        const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
            validationSchema
        });
        const [title, titlelAttrs] =  defineField('title')
        const [slug, sluglAttrs] =  defineField('slug')
        const [description, descriptionlAttrs] =  defineField('description')
        const [price, pricelAttrs] =  defineField('price')
        const [stock, stocklAttrs] =  defineField('stock')
        const [gender, genderlAttrs] =  defineField('gender')

        const { fields: images} = useFieldArray<string>('images')
        const { fields: sizes, remove:removeSize, push:pushSize} = useFieldArray<string>('sizes')
        const imageFiles = ref<File[]>([]);


        const onSubmit = handleSubmit((values)=>{
            const formValues = {
                ...values,
                images: [...values.images, ...imageFiles.value],

            }
            mutate(formValues)
        })

        const toggleSize = (size: string)=>{
            const currentSiezes = sizes.value.map(s=> s.value);
            const hasSize = currentSiezes.includes(size);

            if(hasSize){
                removeSize( currentSiezes.indexOf(size))
            }else{
                pushSize(size)
            }
        }

        const onFilesChanged = (event: Event)=>{
            const fileInput =  event.target as HTMLInputElement

            const fileList = fileInput.files;

            if(!fileList) return;
            if(fileList.length === 0) return;

            for(const imageFile of fileList){
                imageFiles.value.push(imageFile);
            }
        }

        watchEffect(() =>{
            if(isError.value && !isLoading.value){
                router.replace('/admin/products');
                return;
            }
        })

        watch(product, () =>{
            if(!product) return;

            resetForm({
                values:product.value
            })
        },{
            deep:true,
            immediate:true
        })

        watch(isUpdateSucess, (value)=>{
            if(!value) return;

            toast.success('Producto actualizado correctamente');

            router.replace(`/admin/products/${updatedProduct.value!.id}`)
            resetForm({
                values: updatedProduct.value
            })
            imageFiles.value = [];
        })


        watch(()=> props.productId, ()=> {
            refetch();
        });

        return {
            // propiedades 
            values,
            title, 
            titlelAttrs,
            slug, 
            sluglAttrs,
            description, 
            descriptionlAttrs,
            price, 
            pricelAttrs,
            stock, 
            stocklAttrs,
            gender, 
            genderlAttrs,
            meta,
            isPending,

            imageFiles,

            errors,
            images,
            sizes,


            /// Gettters
            allSizes:[
                'XS',
                'S',
                'M',
                'L',
                'XL',
                'XXL'
            ],


            // Acctions
            onSubmit,
            toggleSize,
            onFilesChanged,


            //
            hasSize:(size:string) => {
                const currentSiezes = sizes.value.map(s=>s.value);
                return currentSiezes.includes(size);
            },

            temporalimageUrl: (imageFile: File)=>{
                return URL.createObjectURL(imageFile)
            }
        }
    },
})


