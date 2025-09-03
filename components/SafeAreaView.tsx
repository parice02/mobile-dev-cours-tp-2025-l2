// SafeAreaView.tsx
import React, { forwardRef, memo, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import {
  SafeAreaView as SafeAreaBase,
  type Edge,
  type SafeAreaViewProps as SafeAreaBaseProps,
} from "react-native-safe-area-context";

export interface SafeAreaViewProps extends Omit<SafeAreaBaseProps, "edges" | "style"> {
  /** Bords protégés par le safe area. Par défaut: ["top","right","bottom","left"] */
  edges?: Edge[];
  /** Style du conteneur */
  style?: StyleProp<ViewStyle>;
  /** Couleur de fond du conteneur */
  backgroundColor?: string;
  /** Mode de la barre système ("light" ou "dark") */
  systemBarStyle?: "light" | "dark" | "auto" | "inverted";
  /** Cache complètement la barre système */
  systemBarHidden?: boolean;
  /** Contenu enfant */
  children?: React.ReactNode;
}

/**
 * SafeAreaView typé + gestion SystemBars via react-native-edge-to-edge
 */
const SafeAreaView = memo(
  forwardRef<typeof SafeAreaBase, SafeAreaViewProps>((props, ref) => {
    const {
      edges = ["right", "left"],
      style,
      backgroundColor = "red",
      systemBarStyle = "auto",
      systemBarHidden = false,
      children,
      ...rest
    } = props;

    const defaultStyle = useMemo(() => ({ flex: 1, backgroundColor }), [backgroundColor]);

    const containerStyle = useMemo(() => {
      if (style) return [defaultStyle, style];
      else return defaultStyle;
    }, [style, defaultStyle]);

    return (
      <SafeAreaBase edges={edges} style={containerStyle} {...rest}>
        <SystemBars style={systemBarStyle} hidden={systemBarHidden} />
        {children}
      </SafeAreaBase>
    );
  }),
);

SafeAreaView.displayName = "SafeAreaView";

export default SafeAreaView;
