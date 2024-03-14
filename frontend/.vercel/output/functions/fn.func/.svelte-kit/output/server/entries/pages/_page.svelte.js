import { c as create_ssr_component, b as add_attribute, v as validate_component, m as missing_component, e as escape, d as each, n as null_to_empty } from "../../chunks/ssr.js";
import imageUrlBuilder from "@sanity/image-url";
import { c as client } from "../../chunks/sanity.js";
import { spanToPlainText, isPortableTextToolkitList, isPortableTextListItemBlock, buildMarksTree, isPortableTextToolkitSpan, isPortableTextBlock, isPortableTextToolkitTextNode, nestLists, LIST_NEST_MODE_HTML } from "@portabletext/toolkit";
import { register } from "swiper/element/bundle";
import { l as language } from "../../chunks/language.js";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
function getRandomKey() {
  return Math.random().toFixed(5).split(".")[1];
}
function assertSpanKey(span) {
  return {
    _key: span._key || getRandomKey(),
    ...span
  };
}
function assertBlockKey(block) {
  return {
    _key: block._key || getRandomKey(),
    ...block,
    ...block._type === "block" && Array.isArray(block.children) ? {
      children: block.children.map(assertSpanKey)
    } : {}
  };
}
const DefaultMark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let markType;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ markType } = portableText);
  return `${markType === "strong" ? `<strong>${slots.default ? slots.default({}) : ``}</strong>` : `${markType === "em" ? `<em>${slots.default ? slots.default({}) : ``}</em>` : `${markType === "code" ? `<code>${slots.default ? slots.default({}) : ``}</code>` : `${markType === "underline" ? `<span style="text-decoration:underline;">${slots.default ? slots.default({}) : ``}</span>` : `${markType === "strike-through" ? `<del>${slots.default ? slots.default({}) : ``}</del>` : `${slots.default ? slots.default({}) : ``}`}`}`}`}`}`;
});
const DefaultLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let href;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ value } = portableText);
  href = (value === null || value === void 0 ? void 0 : value.href) || (value === null || value === void 0 ? void 0 : value.url) || (value === null || value === void 0 ? void 0 : value.link) || (value === null || value === void 0 ? void 0 : value.value);
  return `${typeof href === "string" ? `<a${add_attribute("href", href, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `${slots.default ? slots.default({}) : ``}`}`;
});
const DefaultBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let style;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ value } = portableText);
  style = value.style || "normal";
  return `${["h1", "h2", "h3", "h4", "h5", "h6", "blockquote"].includes(style) ? `${((tag) => {
    return tag ? `<${style}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(style)}` : `${style === "normal" ? `<p>${slots.default ? slots.default({}) : ``}</p>` : `${slots.default ? slots.default({}) : ``}`}`}`;
});
const DefaultList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let listItem;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  ({ value } = portableText);
  ({ listItem } = value);
  return `${listItem === "number" ? `<ol>${slots.default ? slots.default({}) : ``}</ol>` : `<ul>${slots.default ? slots.default({}) : ``}</ul>`}`;
});
const DefaultListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<li>${slots.default ? slots.default({}) : ``}</li>`;
});
const DefaultHardBreak = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<br>`;
});
const UnknownType = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
const defaultComponents = {
  marks: {
    "strike-through": DefaultMark,
    code: DefaultMark,
    em: DefaultMark,
    strong: DefaultMark,
    underline: DefaultMark,
    link: DefaultLink
  },
  block: {
    blockquote: DefaultBlock,
    h1: DefaultBlock,
    h2: DefaultBlock,
    h3: DefaultBlock,
    h4: DefaultBlock,
    h5: DefaultBlock,
    h6: DefaultBlock,
    normal: DefaultBlock
  },
  list: {
    bullet: DefaultList,
    number: DefaultList
  },
  listItem: {
    bullet: DefaultListItem,
    number: DefaultListItem
  },
  types: {},
  hardBreak: DefaultHardBreak,
  unknownBlockStyle: DefaultBlock,
  unknownList: DefaultList,
  unknownListItem: DefaultListItem,
  unknownMark: DefaultMark,
  unknownType: UnknownType
};
function mergeComponents(parent, overrides = {}) {
  return {
    ...parent,
    ...overrides,
    block: mergeDeeply(parent, overrides, "block"),
    list: mergeDeeply(parent, overrides, "list"),
    listItem: mergeDeeply(parent, overrides, "listItem"),
    marks: mergeDeeply(parent, overrides, "marks"),
    types: mergeDeeply(parent, overrides, "types")
  };
}
function mergeDeeply(parent, overrides, key) {
  const override = overrides[key];
  const parentVal = parent[key];
  if (typeof override === "function") {
    return override;
  }
  if (override && typeof parentVal === "function") {
    return override;
  }
  if (override) {
    return { ...parentVal, ...override };
  }
  return parentVal;
}
const RenderBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components;
  let style;
  let blockComponent;
  let blockProps;
  let { global } = $$props;
  let { node } = $$props;
  let { indexInParent } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  ({ components } = global);
  ({ style = "normal" } = node);
  blockComponent = typeof components.block === "function" ? components.block : components.block[style];
  {
    if (!blockComponent) {
      global.missingComponentHandler(style, "blockStyle");
    }
  }
  blockProps = /* @__PURE__ */ (() => {
    return { global, indexInParent, value: node };
  })();
  return `${validate_component(blockComponent || components.unknownBlockStyle || missing_component, "svelte:component").$$render($$result, { portableText: blockProps }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const RenderCustomBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components;
  let _type;
  let customComponent;
  let componentProps;
  let { global } = $$props;
  let { node } = $$props;
  let { parentBlock } = $$props;
  let { indexInParent } = $$props;
  let { isInline = false } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.parentBlock === void 0 && $$bindings.parentBlock && parentBlock !== void 0)
    $$bindings.parentBlock(parentBlock);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  if ($$props.isInline === void 0 && $$bindings.isInline && isInline !== void 0)
    $$bindings.isInline(isInline);
  ({ components } = global);
  ({ _type } = node);
  customComponent = components.types[_type];
  {
    if (!customComponent) {
      global.missingComponentHandler(_type, "block");
    }
  }
  componentProps = /* @__PURE__ */ (() => {
    return {
      global,
      value: node,
      indexInParent,
      parentBlock,
      isInline
    };
  })();
  return `${validate_component(customComponent || components.unknownType || missing_component, "svelte:component").$$render($$result, { portableText: componentProps }, {}, {})}`;
});
const RenderList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components;
  let listItem;
  let handler;
  let listComponent;
  let listProps;
  let { global } = $$props;
  let { indexInParent } = $$props;
  let { node } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  ({ components } = global);
  ({ listItem } = node);
  handler = typeof components.list === "function" ? components.list : components.list[listItem];
  listComponent = handler;
  {
    if (!listComponent) {
      global.missingComponentHandler(listItem, "listStyle");
    }
  }
  listProps = /* @__PURE__ */ (() => {
    return { global, value: node, indexInParent };
  })();
  return `${validate_component(listComponent || components.unknownList || missing_component, "svelte:component").$$render($$result, { portableText: listProps }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const RenderListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components;
  let style;
  let listItemComponent;
  let styleComponent;
  let listItemProps;
  let { global } = $$props;
  let { indexInParent } = $$props;
  let { node } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.indexInParent === void 0 && $$bindings.indexInParent && indexInParent !== void 0)
    $$bindings.indexInParent(indexInParent);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  ({ components } = global);
  ({ style = "normal" } = node);
  listItemComponent = typeof components.listItem === "function" ? components.listItem : components.listItem[style];
  {
    if (!listItemComponent) {
      global.missingComponentHandler(style, "listItemStyle");
    }
  }
  styleComponent = style !== "normal" ? components.block[style] : void 0;
  listItemProps = /* @__PURE__ */ (() => {
    return { global, value: node, indexInParent };
  })();
  return `${validate_component(listItemComponent || components.unknownListItem || missing_component, "svelte:component").$$render($$result, { portableText: listItemProps }, {}, {
    default: () => {
      return `${styleComponent ? `${validate_component(styleComponent || missing_component, "svelte:component").$$render(
        $$result,
        {
          portableText: {
            // Different props for the block that will hold this list
            ...listItemProps,
            value: {
              ...node,
              // BlockComponentProps shouldn't receive a listItem
              listItem: void 0
            }
          }
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}` : `${slots.default ? slots.default({}) : ``}`}`;
    }
  })}`;
});
const RenderSpan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components;
  let markType;
  let markComponent;
  let markProps;
  let { global } = $$props;
  let { node } = $$props;
  let { parentBlock } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.parentBlock === void 0 && $$bindings.parentBlock && parentBlock !== void 0)
    $$bindings.parentBlock(parentBlock);
  ({ components } = global);
  ({ markType } = node);
  markComponent = components.marks[markType];
  {
    if (!markComponent) {
      global.missingComponentHandler(markType, "mark");
    }
  }
  markProps = (() => {
    return {
      global,
      parentBlock,
      markType,
      value: node.markDef,
      markKey: node.markKey,
      plainTextContent: spanToPlainText(node)
    };
  })();
  return `${validate_component(markComponent || components.unknownMark || missing_component, "svelte:component").$$render($$result, { portableText: markProps }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const RenderText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let components;
  let text;
  let { global } = $$props;
  let { node } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  ({ components } = global);
  ({ text } = node);
  return `${text === "\n" ? `${typeof components.hardBreak === "function" ? `${validate_component(components.hardBreak || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${escape(text)}`}` : `${escape(text)}`}`;
});
const RenderNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let node;
  let indexInParent;
  let parentBlock;
  let isInline;
  let { global } = $$props;
  let { options } = $$props;
  if ($$props.global === void 0 && $$bindings.global && global !== void 0)
    $$bindings.global(global);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  ({ node, indexInParent, parentBlock, isInline } = options);
  return `${isPortableTextToolkitList(node) ? `${validate_component(RenderList, "RenderList").$$render($$result, { node, indexInParent, global }, {}, {
    default: () => {
      return `${each(node.children, (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              node: child,
              indexInParent: childIndex,
              // The list's children will be parsed as PortableTextListItem, which will pass the proper parentBlock & isInline
              parentBlock: void 0,
              isInline: void 0
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextListItemBlock(node) ? `${validate_component(RenderListItem, "RenderListItem").$$render($$result, { node, indexInParent, global }, {}, {
    default: () => {
      return `${each(buildMarksTree(node), (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              // Pass the current listItem as a parentBlock
              parentBlock: node,
              node: child,
              isInline: true,
              indexInParent: childIndex
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextToolkitSpan(node) ? `${validate_component(RenderSpan, "RenderSpan").$$render($$result, { node, parentBlock, global }, {}, {
    default: () => {
      return `${each(node.children, (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              parentBlock,
              node: child,
              isInline: true,
              indexInParent: childIndex
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextBlock(node) ? `${validate_component(RenderBlock, "RenderBlock").$$render($$result, { node, indexInParent, global }, {}, {
    default: () => {
      return `${each(buildMarksTree(node), (child, childIndex) => {
        return `${validate_component(RenderNode, "svelte:self").$$render(
          $$result,
          {
            options: {
              parentBlock: node,
              node: child,
              isInline: true,
              indexInParent: childIndex
            },
            global
          },
          {},
          {}
        )}`;
      })}`;
    }
  })}` : `${isPortableTextToolkitTextNode(node) ? `${validate_component(RenderText, "RenderText").$$render($$result, { node, global }, {}, {})}` : `${node ? `${validate_component(RenderCustomBlock, "RenderCustomBlock").$$render(
    $$result,
    {
      node,
      parentBlock,
      indexInParent,
      isInline,
      global
    },
    {},
    {}
  )}` : ``}`}`}`}`}`}`;
});
const getTemplate = (type, prop) => `Unknown ${type}, specify a component for it in the \`components${prop ? "." : ""}${prop}\` prop`;
const getWarningMessage = (type, nodeType) => {
  switch (nodeType) {
    case "block":
      return getTemplate(`block type "${type}"`, "types");
    case "blockStyle":
      return getTemplate(`block style "${type}"`, "block");
    case "listItemStyle":
      return getTemplate(`list item style "${type}"`, "listItem");
    case "listStyle":
      return getTemplate(`list style "${type}"`, "list");
    case "mark":
      return getTemplate(`mark type "${type}"`, "marks");
    default:
      return getTemplate("type");
  }
};
function printWarning(message) {
  console.warn(message);
}
const PortableText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mergedComponents;
  let keyedBlocks;
  let blocks;
  let missingComponentHandler;
  let { value = [] } = $$props;
  let { components } = $$props;
  let { context = {} } = $$props;
  let { onMissingComponent = true } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  if ($$props.onMissingComponent === void 0 && $$bindings.onMissingComponent && onMissingComponent !== void 0)
    $$bindings.onMissingComponent(onMissingComponent);
  mergedComponents = mergeComponents(defaultComponents, components);
  keyedBlocks = (Array.isArray(value) ? value : [value]).map(assertBlockKey);
  blocks = nestLists(keyedBlocks, LIST_NEST_MODE_HTML);
  missingComponentHandler = (type, nodeType) => {
    if (onMissingComponent === false) {
      return;
    }
    const message = getWarningMessage(type, nodeType);
    if (typeof onMissingComponent === "function") {
      onMissingComponent(message, { type, nodeType });
      return;
    }
    printWarning(message);
  };
  return `${each(blocks, (node, index) => {
    return `${validate_component(RenderNode, "RenderNode").$$render(
      $$result,
      {
        global: {
          components: mergedComponents,
          missingComponentHandler,
          context,
          ptBlocks: blocks,
          ptRawValue: value
        },
        options: {
          node,
          isInline: false,
          indexInParent: index
        }
      },
      {},
      {}
    )}`;
  })}`;
});
const css$1 = {
  code: ".svelte-y2alff{max-width:640px}p.svelte-y2alff{margin-top:36px;margin-bottom:36px}p.marginTop.svelte-y2alff{margin-top:0}h1.svelte-y2alff{color:red;font-weight:400}h2.svelte-y2alff{color:red;font-weight:400}h3.svelte-y2alff{color:red;font-weight:400}h4.svelte-y2alff{font-size:18px;line-height:18px;text-transform:uppercase;font-weight:400;margin:0}",
  map: null
};
const PortableTextStyle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let indexInParent;
  let global;
  let value;
  let ptBlocks;
  let style;
  let precededByHeading;
  let { portableText } = $$props;
  if ($$props.portableText === void 0 && $$bindings.portableText && portableText !== void 0)
    $$bindings.portableText(portableText);
  $$result.css.add(css$1);
  ({ indexInParent, global, value } = portableText);
  ({ ptBlocks } = global);
  ({ style } = value);
  precededByHeading = ["h1", "h2", "h3", "h4", "h5"].includes(ptBlocks[indexInParent - 1]?.style);
  `heading-${value._key}`;
  return `   ${style === "normal" ? `<p class="${"paragraph " + escape(precededByHeading ? "marginTop" : "", true) + " svelte-y2alff"}">${slots.default ? slots.default({}) : ``}</p>` : `${style === "h1" ? `<h1 class=" svelte-y2alff">${slots.default ? slots.default({}) : ``}</h1>` : `${style === "h2" ? `<h2 class=" svelte-y2alff">${slots.default ? slots.default({}) : ``}</h2>` : `${style === "h3" ? `<h3 class=" svelte-y2alff">${slots.default ? slots.default({}) : ``}</h3>` : `<h4 class=" svelte-y2alff">${slots.default ? slots.default({}) : ``}</h4>`}`}`}`}`;
});
const css = {
  code: "h2.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6,h3.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{font-weight:400}section.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{display:block;position:relative;width:100%}section.media.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{height:100vh}section.media.svelte-17dn8r6>picture.svelte-17dn8r6>img.svelte-17dn8r6.svelte-17dn8r6{width:100%;height:100%;object-fit:cover}section.slider.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{height:100vh;background-color:#F7F5E5}section.slider.svelte-17dn8r6>picture.svelte-17dn8r6>img.svelte-17dn8r6.svelte-17dn8r6{width:50%;height:100%;position:absolute;right:0;object-fit:cover}swiper-container.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{width:25%;height:60vh;left:12.5%;top:20vh;position:absolute;z-index:0}swiper-slide.svelte-17dn8r6>picture.slide.svelte-17dn8r6>img.svelte-17dn8r6.svelte-17dn8r6{width:100%;height:50vh;position:relative;object-fit:cover}swiper-container.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6::part(bullet){background:transparent;border:solid 1px #000;width:6px;height:6px;opacity:1}swiper-container.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6::part(bullet-active){background:#000;border:solid 1px #000;width:6px;height:6px;opacity:1}.swiper-button-prev.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6,.swiper-button-next.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{position:absolute;height:50vh;width:12.5%;top:15vh;z-index:2;opacity:0;cursor:pointer}.swiper-button-prev.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{left:12.5%}.swiper-button-next.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{left:25%}.caption.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{font-size:12px;text-align:center;margin:0;margin-top:calc(var(--gutter)/2)}section.text.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{background-color:#FFAF22;height:auto;z-index:2}h2.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{line-height:25.2px;max-width:800px;text-align:center;margin:auto;padding:100px 0;font-size:18px}section.menu.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{height:auto;background-color:#FFAF22;z-index:2}h3.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{line-height:25.2px;max-width:800px;text-align:center;margin:auto;padding:100px 0;text-transform:uppercase;cursor:pointer;font-size:18px}h3.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6:hover,h3.open.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{color:#F7F5E5}h3.svelte-17dn8r6>span.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{display:inline-block;transition:var(--transition);transition-property:transform}h3.open.svelte-17dn8r6>span.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{transform:rotate(180deg)}.menuContent.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{text-align:center}.menuContentChild.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{border-top:solid 1px #000;margin:auto;padding:40px 0;box-sizing:border-box;line-height:18px;display:grid;justify-content:center}#preFooter.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{z-index:2;display:block;position:relative;width:100%;z-index:2;background-color:#F7F5E5;padding-bottom:56px}#preFooter.svelte-17dn8r6>div.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6,#preFooter.svelte-17dn8r6>div.svelte-17dn8r6>picture.svelte-17dn8r6.svelte-17dn8r6{display:block;height:auto;position:relative}#preFooter.svelte-17dn8r6>div.svelte-17dn8r6>picture.svelte-17dn8r6>img.svelte-17dn8r6{width:100%;height:100%;vertical-align:bottom;object-fit:cover}#cta.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{position:absolute;top:50%;left:50%;display:flex;width:auto;transform:translateX(-50%) translateY(-50%);gap:var(--gutter)}.btn.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{padding:1rem;background-color:#FFAF22;color:#000;border-radius:100px;text-decoration:none;text-align:center;font-size:13px;text-transform:uppercase;padding:17px 0;width:200px;letter-spacing:-0.01em;border:none}.btn.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6:hover{background-color:#F7F5E5}#form.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{background-color:#FFAF22}#form.svelte-17dn8r6>p.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{margin:0;padding:var(--gutter) calc(var(--gutter)*1.75);font-size:18px;line-height:25.2px}input.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6,textarea.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{margin:0;padding:var(--gutter) calc(var(--gutter)*1.75);font-size:18px;line-height:25.2px;border:none;display:block;width:calc(100% - var(--gutter)*3.5);border-top:solid 1px #000;background-color:#F7F5E5;color:#000;font-family:'GoodSans-Regular';font-weight:400}textarea.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{min-height:150px;resize:none}textarea.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6:focus,input.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6:focus{outline:none}.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6::placeholder{color:#000;opacity:1}.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6::-ms-input-placeholder{color:#000}#submit.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6.svelte-17dn8r6{width:auto;padding-left:39px;padding-right:39px;position:absolute;right:calc(var(--gutter)*1.75);bottom:0%;cursor:pointer;margin-bottom:56px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  register();
  let lang;
  language.subscribe((language2) => {
    lang = language2;
  });
  let { open = false } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  $$result.css.add(css);
  return `${data.homepage ? `${each(data.homepage[0].contents, (block) => {
    return `<section class="${escape(null_to_empty(block.kind), true) + " svelte-17dn8r6"}">${block.image ? `<picture class="svelte-17dn8r6"><img${add_attribute("src", urlFor(block.image).url(), 0)} alt="Fullscreen of Apicio16" class="svelte-17dn8r6"> </picture>` : ``} ${block.text ? `<h2 class="svelte-17dn8r6">${escape(block.text[lang])}</h2>` : ``} ${block.sliderImages ? `<swiper-container init="false" class="svelte-17dn8r6">${each(block.sliderImages, (sliderImage) => {
      return `<swiper-slide class="svelte-17dn8r6"><picture class="slide svelte-17dn8r6"><img${add_attribute("src", urlFor(sliderImage.sliderImage).url(), 0)} alt="Halfscreen of Apicio16" class="svelte-17dn8r6"></picture> <p class="caption svelte-17dn8r6">${escape(sliderImage.sliderCaption[lang])}</p> </swiper-slide>`;
    })}</swiper-container> ` : ``} ${block.menuTitle ? `<h3 class="${["svelte-17dn8r6", open ? "open" : ""].join(" ").trim()}">${escape(block.menuTitle[lang])} <span class="svelte-17dn8r6" data-svelte-h="svelte-1nbea6p">↓</span></h3> <div class="menuContent svelte-17dn8r6">${open ? `<div class="svelte-17dn8r6"><div class="menuContentChild svelte-17dn8r6">${validate_component(PortableText, "PortableText").$$render(
      $$result,
      {
        value: block.menuContent[lang],
        components: {
          block: {
            normal: PortableTextStyle,
            h1: PortableTextStyle,
            h2: PortableTextStyle,
            h3: PortableTextStyle,
            h4: PortableTextStyle,
            h5: PortableTextStyle
          }
        }
      },
      {},
      {}
    )}</div> </div>` : ``} </div>` : ``} </section>`;
  })}` : `<p class="svelte-17dn8r6" data-svelte-h="svelte-1uim0w5">No blocks found.</p>`} <section id="preFooter" class="svelte-17dn8r6"><div class="svelte-17dn8r6">${data.siteSettings[0].footerImage ? `<picture class="svelte-17dn8r6"><img${add_attribute("src", urlFor(data.siteSettings[0].footerImage).url(), 0)} alt="Outsides of Apicio16" class="svelte-17dn8r6"></picture>` : ``} <div id="cta" class="svelte-17dn8r6"><a class="btn svelte-17dn8r6" href="${"mailto:" + escape(data.siteSettings[0].mail, true)}">Book a table</a> <a class="btn svelte-17dn8r6" href="/menu" data-svelte-h="svelte-d9rikh">Read the menu</a></div></div> <div id="form" class="svelte-17dn8r6"><p class="svelte-17dn8r6">${lang == "en" ? `Get in touch with us by filling out the contact form, and we&#39;ll get back to you as soon as possible.` : `${lang == "it" ? `Mettiti in contatto con noi compilando il modulo di contatto e ti risponderemo il prima possibile.` : ``}`}</p> ${lang == "en" ? `<form action="" class="svelte-17dn8r6" data-svelte-h="svelte-19wldim"><input type="text" id="fname" name="fname" placeholder="First name (required)" class="svelte-17dn8r6"> <input type="text" id="lname" name="lname" placeholder="Last name (required)" class="svelte-17dn8r6"> <input type="email" id="email" name="email" placeholder="E-mail (required)" class="svelte-17dn8r6"> <input type="tel" id="phone" name="phone" placeholder="Phone" class="svelte-17dn8r6"> <textarea type="text" id="message" name="message" placeholder="Message" maxlength="400" class="svelte-17dn8r6"></textarea></form>` : `${lang == "it" ? `<form action="" class="svelte-17dn8r6" data-svelte-h="svelte-1uj8hn1"><input type="text" id="fname" name="fname" placeholder="Nome (obbligatorio)" class="svelte-17dn8r6"> <input type="text" id="lname" name="lname" placeholder="Cognome (obbligatorio)" class="svelte-17dn8r6"> <input type="email" id="email" name="email" placeholder="E-mail (obbligatorio)" class="svelte-17dn8r6"> <input type="tel" id="phone" name="phone" placeholder="Telefono" class="svelte-17dn8r6"> <textarea type="text" id="message" name="message" placeholder="Messaggio" maxlength="400" class="svelte-17dn8r6"></textarea></form>` : ``}`}</div> <button id="submit" class="btn svelte-17dn8r6" href="/menu">${lang == "en" ? `Submit` : `${lang == "it" ? `Invia` : ``}`}</button> </section>`;
});
export {
  Page as default
};
