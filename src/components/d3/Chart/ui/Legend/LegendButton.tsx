// import { css } from 'styled-components';

// import {
//   Button as ButtonBase,
//   type ButtonProps as ButtonBaseProps,
// } from '@chakra-ui/react';
// import { DgoIcon } from '@dgo/shared/components';

// export const legendButtonStyles = css<React.ComponentProps<typeof ButtonBase>>`
//   && {
//     border-radius: ${(props) => props.theme.borderRadius}
//       ${(props) => props.theme.borderRadius} 0 0;
//     transform: rotate(-90deg) translate(-100%, -100%);
//     transform-origin: top left;

//     color: ${(props) =>
//       props.disabled
//         ? props.theme.colorDisabled
//         : props.variant === 'inverse'
//           ? 'var(--chakra-colors-text-light)'
//           : props.variant === 'transparent'
//             ? props.theme.uniIcon4
//             : 'var(--chakra-colors-link-text-default)'};

//     background-color: ${(props) =>
//       props.disabled
//         ? props.theme.colorButtonDisabled
//         : props.variant === 'inverse'
//           ? 'var(--chakra-colors-button-background-default)'
//           : props.variant === 'light'
//             ? props.theme.colorButtonLight
//             : 'transparent'};

//     &:focus,
//     &:active,
//     &:hover {
//       background-color: ${(props) =>
//         props.disabled
//           ? props.theme.colorButtonDisabled
//           : props.variant === 'inverse'
//             ? props.theme.colorButtonHover
//             : props.variant === 'light'
//               ? props.theme.colorButtonLightHover
//               : 'transparent'};
//     }

//     .icon use {
//       fill: ${(props) =>
//         props.disabled
//           ? props.theme.colorDisabled
//           : props.variant === 'inverse'
//             ? 'var(--chakra-colors-text-light)'
//             : props.variant === 'transparent'
//               ? props.theme.uniIcon4
//               : 'var(--chakra-colors-link-text-default)'};
//     }

//     &:focus .icon use,
//     &:active .icon use,
//     &:hover .icon use {
//       fill: ${(props) =>
//         props.disabled
//           ? props.theme.colorDisabled
//           : props.variant === 'inverse'
//             ? 'var(--chakra-colors-text-light)'
//             : props.variant === 'transparent'
//               ? props.theme.colorIcon8
//               : props.theme.colorButtonHover};
//     }
//   }
// `;

// // Omit the emotion css prop, in order to support the styled component css prop
// type ButtonProps = Omit<ButtonBaseProps, 'css'>;
// const StylableButton = (props: ButtonProps) => <ButtonBase {...props} />;
// type LegendButtonProps = ButtonProps & {
//   open: boolean;
// };

// export const LegendButton = ({ open, ...rest }: LegendButtonProps) => (
//   <StylableButton
//     {...rest}
//     variant="inverse"
//     rightIcon={
//       <DgoIcon
//         name="uniDoubleArrowRight"
//         transform={`rotate(${open ? '90deg' : '-90deg'})`}
//         data-testid="uniDoubleArrowRight"
//       />
//     }
//     css={legendButtonStyles}
//   />
// );
