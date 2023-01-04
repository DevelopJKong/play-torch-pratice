// 1. Import torch, torchvision, and media from PlayTorch SDK
import { torch, torchvision, media } from "react-native-pytorch-core";

// 2. Alias for torchvision transforms
const T = torchvision.transforms;

// 3. The classifyImage function that will process an image and return the top
// class label
export default async function classifyImage(image) {
  // 3.i. Get image width and height
  const width = image.getWidth();
  const height = image.getHeight();

  // 3.ii. Convert image to blob, which is a byte representation of the image
  // in the format height (H), width (W), and channels (C), or HWC for short
  const blob = media.toBlob(image);

  // 3.iii. Get a tensor from image the blob and also define in what format
  // the image blob is.
  let tensor = torch.fromBlob(blob, [height, width, 3]);

  // 3.iv. Rearrange the tensor shape to be [CHW]
  tensor = tensor.permute([2, 0, 1]);

  // 3.v. Divide the tensor values by 255 to get values between [0, 1]
  tensor = tensor.div(255);

  // 3.vi. Crop the image in the center to be a squared image
  const centerCrop = T.centerCrop(Math.min(width, height));
  tensor = centerCrop(tensor);

  // 3.vii. Resize the image tensor to 3 x 224 x 224
  const resize = T.resize(224);
  tensor = resize(tensor);

  // 3.viii. Normalize the tensor image with mean and standard deviation
  const normalize = T.normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]);
  tensor = normalize(tensor);

  // 3.ix. Unsqueeze adds 1 leading dimension to the tensor
  tensor = tensor.unsqueeze(0);

  // 3.x. Return the tensor shape [1, 3, 224, 224]
  return tensor.shape;
}
